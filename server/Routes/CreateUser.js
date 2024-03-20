import express from "express";
import User from '../models/User.js';
import {body,validationResult} from 'express-validator'
const router = express.Router()
import bcrypt from 'bcrypt'

export default router.post("/createuser", 
[
    body('name').isLength({min:3}),
    body('password','Password length must be atleast 5').isLength({min:5}),
    body('email','Email format is wrong').isEmail()
], 
async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    try {
        await User.create({
            name: req.body.name,
            password: hashPassword,
            email: req.body.email,
            location: req.body.location  
        }).then(res.json({success:true}))

    } catch (error) {
        console.log(error)
        res.json({success:false})
    }
})
