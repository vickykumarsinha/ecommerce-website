
const express = require('express');

const router = express.Router();
const {register} = require('../../controllers/auth/auth-controller');

router.post('/register', register);