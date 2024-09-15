import mongoose from "mongoose";

export const db=mongoose.connect("mongodb://localhost:27017/MedMitra")
.then((result)=>{
        console.log("Connected to Database")
})
.catch((err)=>console.log(err))