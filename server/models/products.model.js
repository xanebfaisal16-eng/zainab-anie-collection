import mongoose from "mongoose"

import { Schema, model } from 'mongoose'
import reviewSchema from "./model.reviews.js";
const productsSchema = new Schema({
        title:{
            type: String,
            required: true
        },

         reviews :[reviewSchema],

         brand:{
            type: String,
            required: true
        },

         category:{
            type: String,
            required: true
        },


    // reviews:{   // make a sperate schema todo in
    //         type: String,
    //         required: true
    //     },


       image: {   
    type: [String], // 
    required: false
},

         price:{
            type: Number,
            required: true
        },


        // rating:{
        //     type: Number,
        //     required: true
        // },
    asn:{
            type: Number,
            required: false,
        },


        tiktokUrl: { type: String, default: "" },
        
         stock:{
            type: Number,
            required: true,
            default : 0
        }

},{timestamps: true})
const products = model("products", productsSchema);
export default products;

 

// local ----> scheema(model)------> controller --> route ---> server.js