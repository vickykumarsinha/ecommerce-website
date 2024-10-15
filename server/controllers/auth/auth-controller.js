const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../../db-models/User");


// Register
const register = async(req, res) => {
    const {userName, email, password} = req.body;
    
    try{
       
        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            userName, email, password : hashPassword ,
        })

        await newUser.save();
        res.statue(200).json({
            success: true,
            message: "Registered new user",
        })
    }catch(e) {
        console.log(e); 
        res.statue(500).json({
            success: false,
            message: "Some error occured",
        });
    }
}




// Login

const login = async(req, res) =>{
    const {email, password} = req.body;

    try{
        
    }catch(e) {
        console.log(e); 
        res.statue(500).json({
            success: false,
            message: "Some error occured",
        });
    }
}



// auth middleware  



module.exports = {register};