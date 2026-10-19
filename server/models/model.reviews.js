import mongoose from "mongoose"

import { Schema , ObjectId  } from 'mongoose'

const reviewSchema = new Schema ({
     id: {
        type: Schema.Types.ObjectId,   /// name uth ga ay ga object id s user must be logged in {inner join}
        require: true
     },


        comment: {
        type: String,
        require: true
     },


        rating: {
        type: Number,
        require: true
     },


        adress: {
        type: String,
        require: true
     },


        timeOfReviewed: {
        type: Date,
     }

})

export default reviewSchema