import mongoose, { Schema } from "mongoose";

const quotesSchema = new mongoose.Schema(
    {
        quote:{
            type:String,
            required: true
        },
        author:{
            type:String,
            required:true
        }
    },
    {
        timestamps: true,
    }
)


export const Quote = mongoose.model('Quote', quotesSchema);