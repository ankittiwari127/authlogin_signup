const bcrypt=require("bcrypt");
const usermodel=require("../models/user");
const jwt=require("jsonwebtoken");
//kuchh bhi data jo dotenv file me hai ueko 
//use karne ke liye yaha pe load karna padega 
require("dotenv").config();
//signup route handler
exports.signup=async (req,res)=>{
    try{
        //get data
        const {name,email,password,role}=req.body;
        //check if user already exist  in db
        const existingUser=await usermodel.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exist"
            })
        }
        //now secure the password
        let hashpassword;
        try{
            hashpassword=await bcrypt.hash(password,10);
        }
        catch(error){
           return res.status(500).json({
            success:false,
            message:"error in hashing"
           }) 
        }
        //create object for user in db
        const user =await usermodel.create({
            name,email,password:hashpassword,role
        })
        return res.status(200).json({
            success:true,
            message:"user created successfully"
           }) 
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"error in signup user"
           }) 
    }
        
}
exports.login=async (req,res)=>{
    try {
        //fetch data 
        const {email,password}=req.body;
        ///validation on email
        if(!email ||!password){
            return res.status(400).json({
                success:false,
                message :"please fill all detail"
            })
        }
        //check for the registered user 
       let user =await usermodel.findOne({email});
       //if user not registered
       if(!user){
        return res.status(401).json({
            success:false,
            message:"user is not registered",
        })
       }
       const payload={
        email:user.email,
        id:user._id,
        role:user.role,
       }
       //verify password and generate jwt token
       //here bcrypt will compare login pass and saved pass
       if(await bcrypt.compare(password,user.password)){
        //  if pass match now generate token
         let token =jwt.sign(payload,
            process.env.JWT_SECRET,
            {
                expiresIn:"2h",

            })
            //convert user to object
            user=user.toObject();
            user.token=token;
            user.password=undefined;
            const options={
             expires:new Date(Date.now()+3*24*60*60*1000),
             //it means 3 days in milisecond
             httpOnly:true,
            }
            //crete cookies,it takes (cookies name,its value,options);
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"used logged in successfully",
            });
       }
       else{
        //password do not match
        res.status(403).json({
            success:false,
            message:"password incorrect",
        })
       }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"login failure",
        })
        
    }
}