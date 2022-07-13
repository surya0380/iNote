const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');



var Jsecret = "signature";
//ROUTE 1 --> creating an user using /api/auth/createUser endpoint
router.post('/createUser', [
    body('email').isEmail(),
    body('userName').isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),
], async (request, response) => {
    let success;
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        success = false
        return response.status(400).json(success, { errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: request.body.email })
        if (user) {
            success = false;
            return response.status(400).json({success,  error: "sorry, this email already exists" })
        }

        let salt = await bcrypt.genSalt(10);
        let hPass = await bcrypt.hash(request.body.password,salt)

        user = await User.create({
            userName: request.body.userName,
            email: request.body.email,
            password: hPass,
        })

        let data = {
            id: user.id
        }
        var token = jwt.sign(data, Jsecret);
        success= true
        response.json({success, token})

    } catch (error) {
        response.status(500).send(console.error("something went wrong"));
    }
})

//ROUTE 2 --> signing in an user using /api/auth/login endpoint
router.post('/login', [
    body('email','enter a valid email').isEmail(),
    body('password','password should not be empty').exists(),
], async (request, response) => {
    let success;
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    const {email, password}= request.body;
    try {
        let user = await User.findOne({ email: request.body.email })
        if (!user) {
            success= false
            return response.status(400).json({success, error: "Enter correct credentials" })
        }

        passwordCompare = await bcrypt.compare(password, user.password); 
        if (!passwordCompare) {
            success= false
            return response.status(400).json({success, error: "Enter correct credentials" })
        }
        
        let data = {
            id: user.id
        }
        var token = jwt.sign(data, Jsecret);
        success= true
        response.json({success, token})

    } catch (error) {
        response.status(500).send(console.error("something went wrong"));
    }

})

//ROUTE 2 --> signing in an user using /api/auth/login endpoint
router.post('/getUser', fetchuser, async (request, response) => {
    try {
        userId = request.user.id
        const user = await User.findById(userId).select("-password")
        response.send(user)
    }catch (error) {
        response.status(500).json({error: error.message, serverError: "something went wrong"})
        console.log(error.message)
    }
})

module.exports = router