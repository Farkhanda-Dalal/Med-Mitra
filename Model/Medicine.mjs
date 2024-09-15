import mongoose from "mongoose";

const medSchema=new mongoose.Schema({
    userName:{
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
    batchNo:{
        type:String,
        required:true
    },
    exp:{
        type:Date,
        required:true
    },
    MRP:{
        type:Number,
        required:true
    },
    GST:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:false
    },
    rate:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    }

});

const Medicine=mongoose.model("stock",medSchema);

export default Medicine;

