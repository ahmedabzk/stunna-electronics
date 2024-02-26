import express from "express";
import bodyParser from "body-parser";
import errorHandler from "../errors/error.js";
import Order from "../models/order.model.js";
import dotenv from "dotenv";
import Stripe from "stripe";
import getRawBody from "raw-body";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const stripePayment = async (req, res, next) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(req.body.cartItems),
    },
  });

  console.log(req.body.cartItems);

  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "KES",
        product_data: {
          name: item.name,
          images: [item.images[0]],
          description: item.description,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "KE"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "kes",
            },
            display_name: "Free shipping",
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 150000,
              currency: "kes",
            },
            display_name: "Next day",
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      line_items,
      mode: "payment",
      customer: customer.id,
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel-payment`,
    });
    res.send({ url: session.url });
  } catch (err) {
    next(err);
  }
};


const createOrder = async (customer, data) => {
  const Items = JSON.parse(customer.metadata.cart);

  console.log(Items);

  const products = Items.map((item) => {
    return {
      productId: item._id,
      name: item.name,
      brand: item.brand,
      quantity: item.quantity,
      price: item.price,
      color: item.selectedColor,
      image: item.images[0]
    };
  });

  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products,
    amountPaid: data.amount_total / 100,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });

  try {
    const savedOrder = await newOrder.save();
    console.log("Processed Order");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const webhookFunc = async (req, res, next) => {
 
    //  const rawBody = await getRawBody(req.body);
  const signature = req.headers["stripe-signature"];
  let event;
   try {
     event = stripe.webhooks.constructEvent(
       req.rawBody,
       signature,
       process.env.ENDPOINTSECRET
     );
   } catch (err) {
     console.log(err.message);
     res.status(400).send(`Webhook Error: ${err.message}`);
     return;
   }


  if (event.type === "checkout.session.completed") {
    let data = event.data.object;
    
       stripe.customers
         .retrieve(data.customer)
         .then(async (customer) => {
           try {
             // CREATE ORDER
             createOrder(customer, data);
           } catch (err) {
             next(err);
           }
         })
         .catch((err) => {
           next(err);
         });
     }
  
  res.status(200).end();
};
