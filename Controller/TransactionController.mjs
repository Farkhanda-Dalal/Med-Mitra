import Transaction from "../Model/Transaction.mjs";
import Medicine from "../Model/Medicine.mjs"
import {format} from "date-fns";

const userGetter=(req,res)=>{
    const url=req.url
    const user=url.split("/")[2]
    return user
}

export const availablePage=(req,res)=>{
    const user=userGetter(req,res)
    res.render("availablity",{user})
}

export const checkAvailability = (req, res) => {
    const user = userGetter(req, res);
    const medOrder = getMeds(req);
    const promises = []; // Array to store promises
    const availability = {}; // Object to store availability
    let qty;

    // Iterate over the keys of the medOrder object
    Object.keys(medOrder).forEach((key) => {
        
        // Create a promise for each medicine
        const promise = Medicine.findOne({ medName: medOrder[key].name })
            .then((result) => {
                if (result) {
                    qty = result.qty;
                    const status = qty >= medOrder[key].quantity ? "available" : "unavailable";
                    
                    availability[key] = {
                        name: medOrder[key].name,
                        qty: qty,
                        order:medOrder[key].quantity,
                        MRP:result.MRP,
                        status: status
                    };
                } else {
                    availability[key] = {
                        name: medOrder[key].name,
                        qty: 0,
                        status: "unavailable"
                    };
                }
            })
            .catch((err) => {
                console.error(err);
                availability[key] = {
                    name: medOrder[key].name,
                    qty: 0,
                    status: "unavailable"
                };
            });

        promises.push(promise); // Push the promise into the promises array
    });

    // Once all promises are resolved, send the response
    let notification=[]
    Promise.all(promises)
        .then(() => {
            let flag=0
            for (const key in availability){
                if(qty==0 || availability[key].status=="unavailable"){
                    notification+="Only "+availability[key].qty+" units of "+availability[key].name+" are in stock!"
                    flag+=1
                }
            }
            if(flag>0){
                res.render("availablity",{notification,user});
            }
            else{
                const transactionId=getId();
                const date=new Date();
                const formattedDate = format(date, 'dd-MM-yyyy');
                res.render("bill",{availability,user,transactionId,formattedDate});
            }
        })
        .catch((err) => {
            console.error(err);
            res.send(err);
        });
};

const getMeds=(req)=>{
    const allMedicines = {}; // Initialize an empty object to store medicines and quantities
    for (let key in req.body) {
        if (key.startsWith('medicineName_')) {
            const index = key.split('_')[1];
            const medicineName = req.body[key];
            // Retrieve the corresponding quantity
            const quantityKey = `quantity_${index}`;
            const quantity = req.body[quantityKey];
            // Store the medicine name and quantity in the object
            allMedicines[index] = {
                name: medicineName,
                quantity: quantity
            };
            // Do whatever you need with the medicine names and quantities
        }
    }
    return allMedicines;
}

const generateId=(length)=> {
    const charset = '0123456789abcdef'; // Characters to include in the OTP
    let id = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        id += charset[randomIndex];
    }
    return id;
}

const getId=()=>{
    const idLength = 8; 
    const generatedId = generateId(idLength);
    return generatedId;
}

export const generateBill = (req, res) => {
    const { shopOwner, transactionId, date } = req.body;

    // Loop through the request body to extract medicine details
    for (let i = 0; req.body[`medName${i}`] !== undefined; i++) {
        const medName = req.body[`medName${i}`];
        const qty = parseInt(req.body[`qty${i}`]);
        const total = parseFloat(req.body[`total${i}`]);

        // Create a new transaction document
        const newTransaction = new Transaction({
            shopOwner: shopOwner,
            transactionId,
            medName,
            qty,
            total,
            date: new Date()
        });

        Medicine.findOne({ medName: medName })
        .then((medicine) => {
            if (!medicine) {
                throw new Error('Medicine not found');
            }

            medicine.qty -= qty;

            // Save the updated medicine document
            return medicine.save();
        })
        .catch((err) => {
            res.status(500).json({ error: 'Internal server error' });
        });


        // Save the new transaction document to the database
        newTransaction.save()
        .then(()=>{
            const notification="Transaction was completed successfully"
            res.render("services",{notification,userName:shopOwner})
        })
    }
};

export const stockReport=(req,res)=>{
    const user=userGetter(req,res);
    res.render("stockreport",{user});
}

export const showReport = (req, res) => {
    const user = userGetter(req, res);
    const date = req.body.date;
    const dateObject = new Date(date);
    const isoDate = dateObject.toISOString(); // Convert to ISO string in UTC format
    Transaction.find({ date: { $gte: isoDate } }) // Query for dates greater than or equal to the ISO date
        .then((result) => {
            res.render("stockreport", { user, result });
        })
        .catch((err) => {
            console.log(err);
        });
};

