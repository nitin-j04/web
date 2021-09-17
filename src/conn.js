const mongoose=require("mongoose");

const db = process.env.DB || "mongodb://localhost:27017/foodorder";
  //connection creation
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true },(err,database) => {
    if(err) {
      return console.log(err);
    }
  
    console.log("database connected successfully...");
  });
 