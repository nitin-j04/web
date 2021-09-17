const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const loginSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true, "name already exist in database"]
    },

    password: {
        type:String,
        required:true
    },

    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
   

});


loginSchema.methods.generateAuthToken = async function(){

    try {

        const token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
        
    } catch (error) {
        // res.status(404).send("the error part " );
        console.log("the error part " + error);
    }

}

//collection creation

const Login = new mongoose.model("Login", loginSchema);




module.exports = Login;