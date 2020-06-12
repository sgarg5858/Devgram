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
        const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);
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

//Get All Profiles

router.get('/all',auth,async(req,res,next)=>{
    try {
        const profiles = await Profile.find().populate('user',['name','avatar']);
        // console.log(profiles);
        res.status(200).json(profiles);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
})

//Getting Profile for Particular user
router.get('/user/:userid',auth,async(req,res,next)=>{
    try {
        const profile = await Profile.findOne({user:req.params.userid}).populate('user',['name','avatar']);
        if(!profile)
        {
            res.status(400).json({"msg":"Profile Not Found"})
        }
        // console.log(profile);
        res.status(200).json(profile);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
})

//Delete User
router.delete('/delete',auth,async(req,res,next)=>{
    try {
        //Delete All the Posts which user has
        //Delete Profile for user
        await Profile.findOneAndRemove({user:req.user.id});
        //Delete User
        await User.findByIdAndRemove(req.user.id);
        return req.status(200).json("User account has been successfully deleted");
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
})
//Add Experience to Existing Profile
router.put('/addexperience',[auth,[
    check('title','title is required'),
    check('company','company is required'),
    check('from','From date is required')
]], async(req,res,next)=>{
 
    const errors=validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array() });
    }
    
    const{title,company,location,from,to,current,description}=req.body;
    
    const newExp={title,company,location,from,to,current,description};
    
    try {
        
        const profile= await Profile.findOne({user:req.user.id});
        
        profile.experience.unshift(newExp);
        
        await profile.save();
        
        return res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

//delete experience
router.delete('/deleteExperience/:expid',auth, async(req,res,next)=>{
    try {
       
        const profile= await Profile.findOne({user:req.user.id});
       
        let removeIndex=-1;
       
        removeIndex=profile.experience
                                .map(exp=>exp._id)
                                .indexOf(req.params.expid);
        if(removeIndex>=0)
        {
        profile.experience.splice(removeIndex,1);
        }

        await profile.save();
        return res.json(profile);

    }catch (error) {
        console.error(error);
        res.status(500).send('Server Error');   
    }
})

//Add Education to Existing Profile
router.put('/addEducation',[auth,[
    check('school','school is required'),
    check('degree','degree is required'),
    check('from','From date is required')
]], async(req,res,next)=>{
 
    const errors=validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array() });
    }
    
    const{school,degree,fieldofstudy,from,to,current,description}=req.body;
    
    const newEdu={school,degree,fieldofstudy,from,to,current,description};
    
    try {
        
        const profile= await Profile.findOne({user:req.user.id});
        
        profile.education.unshift(newEdu);
        
        await profile.save();
        
        return res.json(profile);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

//delete Education
router.delete('/deleteEducation/:eduid',auth, async(req,res,next)=>{
    try {
       
        const profile= await Profile.findOne({user:req.user.id});
       
        let removeIndex=-1;
       
        removeIndex=profile.education
                                .map(edu=>edu._id)
                                .indexOf(req.params.eduid);
        if(removeIndex>=0)
        {
        profile.education.splice(removeIndex,1);
        }

        await profile.save();
        return res.json(profile);

    }catch (error) {
        console.error(error);
        res.status(500).send('Server Error');   
    }
})
module.exports=router;