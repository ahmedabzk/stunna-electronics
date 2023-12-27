import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
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
    colors: {
        type: Array,
        required: true
    },
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
},{timestamps:true}
);

const Item = mongoose.model('Item', itemSchema);

export default Item;