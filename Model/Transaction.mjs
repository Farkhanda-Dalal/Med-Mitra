import mongoose from "mongoose";

const transactionSchema=new mongoose.Schema({
    shopOwner:{
        type:String,
        required:true
    },
    transactionId:{
        type:String,
        required:true
    },
    medName:{
        type:String,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
})

const Transaction=mongoose.model("transaction",transactionSchema);

export default Transaction;