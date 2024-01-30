const jwt=require("jsonwebtoken");
require("dotenv").config();
//three middleware are auth,isstudent,isadmin
exports.auth=(req,res,next)=>{
    try {
        //extract jwt token
        //in authentication middleware we need token
        //so hme token hi send karna padega
        //hm kisi bhi cookie ka use karke token le sakte hai
        console.log("cookie",req.cookies.token);
        console.log("body",req.body.token);
        const token=req.body.token||req.cookies.token||req.header("Authorization").replace("Bearer ","");
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token missing",
            })
        }
        // verify the token
        ///jwt varify and also decode the token
        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            //in this decode we extract the data of user from token
            console.log(decode);
            req.user=decode;
            //this means maine  req ke ander is payload ko store kr liya
            //tp check the role 
            //decode is payload

        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            })

        }
        next();
       
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"something went wrong"
        })
    }
}
//student middleware
exports.isStudent=(req,res,next)=>{
    try {
        if(req.user.role!=="Student"){
            return res.status(401).json({
                success:false,
                message:"this is a protected route for student"
            })
        }
        next();
        
    } catch (error) {
        return res.status(500).json({
            success:falselse,
            message:"user role is not matching"
        })
        
    }
}
//admin middleware
exports.isAdmin=(req,res,next)=>{
    try {
        if(req.user.role!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"this is a protected route for admin"
            })
        }
        next();
        
    } catch (error) {
        return res.status(500).json({
            success:falselse,
            message:"user role is not matching"
        })
        
    }
}