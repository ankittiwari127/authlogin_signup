const express=require("express");
const router=express.Router();
const{login,signup}=require("../controller/auth");
const {auth,isStudent,isAdmin}=require("../middlewares/authmiddle");
router.post("/signup",signup);
router.post("/login",login);
//protected routes
router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to test protected route"
    })
})
router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        Success:true,
        message:"welcome to the protected route for student",
    })
})
router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the prtected route for admin",
    })
})
module.exports=router;