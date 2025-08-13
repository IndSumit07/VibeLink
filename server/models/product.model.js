import mongoose, { Schema } from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        description:{
            type: String
        }
    }
)