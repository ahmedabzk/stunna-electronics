import mongoose from "mongoose";


const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
        name: { type: String, required: true },
        brand: { type: String, required: true },
        price: { type: Number, required: true },
        color: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
    amountPaid: { type: Number, required: true },
    shipping: { type: Object, required: true },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
