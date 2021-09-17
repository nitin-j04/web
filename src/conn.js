const mongoose=require("mongoose");


  //connection creation
mongoose.connect("mongodb://localhost:27017/foodorder", { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true },(err,database) => {
    if(err) {
      return console.log(err);
    }
    db = database;
    console.log("database connected successfully...");
  });
 