const mongoose=require("mongoose");
 require("dotenv").config();
 const dbConnect=()=>{
    mongoose.connect(process.env.database_url,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log("db connection is successful"))
    .catch((error)=>{
        console.log("issue in db connection");
        console.error(error.message);
        process.exit(1);

    })
 }
 module.exports=dbConnect;