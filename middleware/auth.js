const jwt = require("jsonwebtoken");
const Login = require("../models/login_db");


const auth = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        const verifyuser =  jwt.verify(token,process.env.SECRET_KEY);
        console.log(verifyuser);

        const user = await Login.findOne({ _id: verifyuser._id ,"tokens.token":token });

        console.log(user.email);
        req.token=token;
        req.user=user;
        next();
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = auth;