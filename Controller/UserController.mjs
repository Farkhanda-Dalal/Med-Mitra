import User from "../Model/User.mjs";

let notification

export const signup=(req,res)=>{
    res.render("signup")
}

export const signin=(req,res)=>{
    res.render("login")
}

export const register=(req,res)=>{

    const model=new User(req.body);

    User.findOne({userName:req.body.userName})
    .then((result)=>{
        if(result!=null){
            notification=req.body.userName+" is already taken please Enter another Username"
            res.render("signup",{notification})
        }
        else{
            model.save()
            .then(()=>{
                notification="You have successfully registered. Please Log In here"
                res.render("login",{notification})
            })
            .catch((err)=>console.log(err)); 
        }
    })
    .catch((err)=>console.log(err))

}

export const login=(req,res)=>{
    User.findOne({userName:req.body.userName},{password:1,_id:0})
    .then((result)=>{
        if(result!=null){
            if(result.password==req.body.password){
                notification="Welcome "+req.body.userName+" ! You have successfully logged in";
                const userName=req.body.userName;
                res.render("services",{notification,userName})
            }
            else{
                notification="Invalid Password! Please Login Again"
                res.render("login",{notification})
            }
        }
        else{
            notification="Invalid User Name! Please Login Again"
            res.render("login",{notification})
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}