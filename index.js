const express = require('express');

const app =express();
//here we use cookie parser for storing toekn in cookie
//without iske bhi kr sakte hai
//load config from env
const PORT=process.env.PORT||4000;
//middleware to parse json body request
const cookieparser=require("cookie-parser");
app.use(express.json());
app.use(cookieparser());
//import routes for todo api
const users=require("./routes/users");
app.use("/api/v1",users);
//start server
app.listen(PORT,()=>{
    console.log(`server started successfully at ${PORT}`);
})
//connect database
const dbConnect=require("./config/database");
dbConnect();
//default route
app.get("/",(req,res)=>{
    res.send(`This is home page`);
})