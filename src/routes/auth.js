const express = require('express')
const router = express.Router()
const {check,validationResult} = require('express-validator')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/login',[
    check('email','Please Enter Valid Email').isEmail(),
    check('password','Please Enter Valid Password').not().isEmpty()
], async(req,res,next)=>{
    const errors =validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()})
    }
    //Destructure Object
    const{email,password}=req.body;
    try {
        //Find User in database
    const user = await User.findOne({email:email});
    if(user===null)
    {
        return res.status(400).json({errors:[{msg:"User Not Registered!"}]})
    }
    //Check if entered password matches with original Password
    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch)
    {
        return res.status(400).json({errors:[{msg:"Invalid Credentials!"}]});
    }
    const payload={
        user:{
            id:user.id
        }
    };
    jwt.sign(payload,'mySecret',{expiresIn:3600},
    (err,token)=>{
        if(err)
        {
            throw err;
        }
        return res.status(200).json({token});
    })

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})


module.exports=router;