const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../../db-models/User");


// Register
const register = async(req, res) => {
    const {userName, email, password} = req.body;
    
    try{
        // check user with same eamil and send toast with err
        const checkUser = await User.findOne({email});
        if(checkUser) return res.json({ success: false, message : "User already exists with same email. Try with different one!!"})
        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            userName, email, password : hashPassword ,
        })

        await newUser.save();
        res.status(200).json({
            success: true,
            message: "Registered new user",
        })
    }catch(e) {
        console.log(e); 
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
}




// Login

const login = async(req, res) =>{
    const {email, password} = req.body;

    const checkUser = await User.findOne({email});
        if(!checkUser) return res.json({ success: false, message : "User does't exist. Register first!!"
        })
    const checkUserPass = await bcrypt.compare(password, checkUser.password);
    if(!checkUserPass){
        return res.json({ success: false, message : "Incorrect Password!!"
        })
    }

    // creating User JWT token
    // need to pass SECRET KEY && EXpiry time
    const token = jwt.sign({
        id: checkUser._id, email: checkUser.email, role: checkUser.role
    }, "CLIENT_SECRET_KEY" , {expiresIn: "60m"})

    // storing token in cookie
    res.cookie('token', token, {httpOnly : true, secure: false}).json({
        success: true,
        message: "User Successfully Logged In",
        user : {
            email: checkUser.email,
            id : checkUser._id,
            role: checkUser.role,
        }

    })
 
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
const authmiddleware = async(req, res, next)=>{
    // GET TOKEN FROM COOKIE
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Unauthorissed user!!",
            success : false,
        });
    };

    try{
        const decode = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decode;
        next()
    }catch(error){
        res.status(401).json({
            success: false,
            message: "Unauthorized user!!"
        })
    }
}

// logout

const logout = (req, res) => {
    res.clearCookie("token").json({
        success: false,
        message: "Logged Out Succesfully!!"
    });
};



module.exports = {register, login, logout, authmiddleware};