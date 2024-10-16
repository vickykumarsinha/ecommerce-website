
const express = require('express');
const router = express.Router();
const {register, login, logout, authmiddleware} = require('../../controllers/auth/auth-controller');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check-auth', authmiddleware, (req, res)=> {
    // get user from decoded token
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "Authenticated User!!",
        user,
    });

});

module.exports = router;