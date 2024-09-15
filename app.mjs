import express, { urlencoded } from "express";
import {db} from "./DatabaseConnection/driver.mjs"
import { fileURLToPath } from "url"; 
import { dirname, join } from "path";
import userRoutes from "./Routes/UserRoutes.mjs";
import inventoryRoutes from "./Routes/InventoryRoutes.mjs";
import transactionRoutes from "./Routes/TransactionRoutes.mjs";

const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename);

const app=express() 

app.set("view engine","ejs");
app.set('views', join(__dirname, 'View'));

//static files middle ware
app.use(express.static("Public"))

db
.then(()=>{
    app.listen(3000,()=>{
        console.log("Listening for reqs on port 3000")
    })
})

app.use(urlencoded({extended:true}));
app.use("/user",userRoutes);
app.use("/inventory",inventoryRoutes)
app.use("/transaction",transactionRoutes);



