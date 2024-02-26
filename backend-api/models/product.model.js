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
        required: true,
        default: 0
    },
    colors: {
        type: Array,
        required: true
    },
    storage: {
        type: Array,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    category: {
        type: String,
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