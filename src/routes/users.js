const express = require('express')
const router = express.Router()
const {check,validationResult} = require('express-validator')
const User = require('../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//First API Register User.....
router.post('/register',[
    check('name', 'Your Name is Required').not().isEmpty(),
    check('email','Please Enter Valid Email').isEmail(),
    check('password','Password must be of atleast 6 characters').isLength({min:6})
], async (req,res,next)=>{

    const errors=validationResult(req);

    //Check if any error
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    //Destructuring object
    const{name,email,password} = req.body;

    try {
   
        //Check if email is already Registered
    let user =await User.findOne({"email":email});

    if(user!==null)
    {
        return res.status(400).json({errors:[{msg: 'Email is Already Registered' }]});
    }

    const avatar = gravatar.url(email,{
        s:'200',
        r:'pg',
        d:'mm'
    });
    //New Construct new User
     user = new User({email,name,avatar,password}); 

    //Now we will store hashed password in Database
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password,salt);

    await user.save();

    const payload={
        user:{
            id:user.id
        }
    };

    //Token
    jwt.sign(payload,'mysecret',{expiresIn:3600},(err,token)=>{
        if(err)
        {
            throw err;
        }
        return res.status(200).json({token});
    })

    
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }

});

module.exports=router;