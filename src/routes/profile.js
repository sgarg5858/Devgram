const express = require('express');
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const User = require('../models/User');
const{check,validationResult}= require('express-validator');
const request = require('request');
const router=express.Router();

//Create Profile or Update Profile
router.post('/create',[auth,[
    check('status','Status is Required').not().isEmpty(),
    check('skills','Skills are Required').not().isEmpty()
]], async(req,res,next)=>{

    //Check Validation Errors
    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }

    const{company,website,location,bio,status,githubusername,skills,youtube,facebook,twitter,instagram,linkedin}=
    req.body;

    const profileFields={}
    profileFields.user=req.user.id;
    if(company) profileFields.company=company;
    if(website) profileFields.website=website;
    if(location) profileFields.location=location;
    if(bio) profileFields.bio=bio;
    if(status) profileFields.status=status;
    if(githubusername) profileFields.githubusername=githubusername;
    if(skills)
    {
        if(Array.isArray(skills))
        {
            profileFields.skills=skills;
        }
        else
        {
            profileFields.skills= skills.split(',').map((skill)=>{
                return skill.trim();
            })
        }
    }
    //Build social object.....
    profileFields.social={};
    if(youtube) profileFields.social.youtube=youtube;
    if(facebook) profileFields.social.facebook=facebook;
    if(twitter) profileFields.social.twitter=twitter;
    if(instagram) profileFields.social.instagram=instagram;
    if(linkedin) profileFields.social.linkedin=linkedin;

    try {
     
     //Checking if profile already exists
     let profile = await Profile.findOne({user:req.user.id});   

     //If exists then we have to update
     if(profile)
     {
         profile =  await Profile.findOneAndUpdate(
             {user:req.user.id},
             {$set:profileFields},
             {new:true}
         )
         return res.json(profile);
     }
     //else we have to create new profile for user
     profile= new Profile(profileFields);
     await profile.save();
     res.json(profile);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }

})

//Get Current Logged In User Profile

router.get('/currentUser',auth, async(req,res,next)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id});
        if(!profile)
        {
            return res.status(400).json({msg:'No Profile Found for Logged In User'});
        }
        return res.status(200).json(profile);
    } catch (error) {
        console.error(error.message);
       return res.status(500).send('Server Error');   
    }
})

module.exports=router;