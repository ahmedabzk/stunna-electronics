import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    maxQuantity: {
        type: Number,
        required: true
    },
    colors: {
        type: Array,
        required: true
    },
    // sizes: {
    //     type: Array,
    //     required: true
    // },
    images: {
        type: Array,
        required: true
    },
    featured: {
        type: Boolean,
        required: true
    },
    recommended: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
},{timestamps:true}
);

const Product = mongoose.model('Product', productSchema);

export default Product;