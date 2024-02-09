import express from "express";
import errorHandler from "../errors/error.js";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const stripePayment = async (req, res) => {
  // console.log(req.body);
  
  //  const customer = await stripe.customers.create({
  //    metadata: {
  //      userId: req.body.userId,
  //      cart: JSON.stringify(req.body.cartItems),
  //    },
  //  });
 
  // const line_items = req.body.cartItems.map((item) => {
  //   return {
  //     price_data: {
  //       currency: "KES",
  //       product_data: {
  //         name: item.name,
  //         images: [item.image],
  //         description: item.description,
  //         color: item.colors,
  //         metadata: {
  //           id: item.id,
  //         },
  //       },
  //       unit_amount: item.price * 100,
  //     },
  //     quantity: item.quantity,
  //   };
  // });
  // console.log(line_items);
  const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price_data: {
            currency: 'KES',
            product_data: {
              name: "T-shirt",
            },
            unit_amount: 20000,
          },
          quantity: 1,
        }
      ],
    // customer: customer.id,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/payment-success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel-payment`,
  });

  res.send({ url: session.url });
}
