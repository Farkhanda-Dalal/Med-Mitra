import Medicine from "../Model/Medicine.mjs";

let notification

export const addPage=(req,res)=>{
    const url=req.url
    const user=url.split("/")[2]
    res.render("addstock",{user})
}

export const addStock=(req,res)=>{
    const model=new Medicine(req.body);
    model.save()
    .then(()=>{
        notification="Stock was added successfully"
        res.render("services",{notification,userName:req.body.userName})
    })
    .catch((err)=>console.log(err))
}

export const viewPage=(req,res)=>{
    const url=req.url
    const user=url.split("/")[2]

    Medicine.find({userName:user})
    .then((result)=>{
        res.render("viewstock",{user,result})
    })
    .catch((err)=>console.log(err))
    
}

export const expPage=(req,res)=>{
    const url=req.url
    const user=url.split("/")[2]
    res.render("expstock",{user})
}

export const expStock = (req, res) => {
  const url = req.url;
  const user = url.split("/")[2];
  const stockType = url.split("/")[1];
  let date = new Date();
  let avgDate = new Date(date);
  avgDate.setDate(date.getDate() + 30);
  let goodDate = new Date(date);
  goodDate.setDate(goodDate.getDate() + 365);
  let expiry = {};

  switch (stockType) {
      case "exp-stock-bad":
          expiry["$lte"] = avgDate;
          break;
      case "exp-stock-avg":
          expiry["$gt"] = avgDate;
          expiry["$lt"] = goodDate;
          break;
      case "exp-stock-good":
          expiry["$gte"] = goodDate;
          break;
  }

  Medicine.aggregate([
      {
          $match: { userName: "7farkhanda", exp: expiry }
      },
      {
          $project: {
              medName: 1,
              qty: 1,
              expFormatted: {
                  $dateToString: {
                      format: "%d-%m-%Y", // Format the date as dd-mm-yyyy
                      date: "$exp"
                  }
              },
              _id: 0
          }
      }
  ])
      .then((result) => {
          let currentCategory;
          switch (stockType) {
              case "exp-stock-bad":
                  currentCategory = "bad";
                  break;
              case "exp-stock-avg":
                  currentCategory = "average";
                  break;
              case "exp-stock-good":
                  currentCategory = "good";
                  break;
          }
          res.render("expstock", { user, currentCategory, results: result });
      })
      .catch((err) => console.log(err));
};
