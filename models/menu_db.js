const mongoose=require("mongoose");


const menuSchema = mongoose.Schema({
    name: {
      type :String,
      required : true,
      unique:[true,"name already exist in database"]
    }
  
  });
  
  //collection creation
  
  const Menu = new mongoose.model("Menu",menuSchema);




  module.exports=Menu;