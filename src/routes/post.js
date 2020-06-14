const express = require('express');

const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const User = require('../models/User');
const{check,validationResult}= require('express-validator');
const request = require('request');
const Post= require('../models/Post');
const router = express.Router();

router.post('/addPost', [auth,[
    check('text','text is required').not().isEmpty()
]], async (req,res,next)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }

    try {
        
        const user= await User.findById(req.user.id).select('-password');

        const newPost =new Post( {
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:req.user.id
        });
        const post = await newPost.save();

        res.json(post);

    } catch (error) {
        console.log(error);
        return res.status(500).json('Server Error');
    }


})
//Get All Posts
router.get('/getAllPosts',auth,async(req,res,next)=>{
    try {
        const posts=await Post.find();
        return res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Server Error').sort({date:-1});
    }
})
//Get Post By Id:

router.get('/getPostById/:postid',auth,async (req,res,next)=>{
    try {
        const post = await Post.findById(req.params.postid);
        if(!post)
        {
            return res.status(404).json({msg: 'Post Not Found'});
        }
        return res.status(200).json(post);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Server Error');
    }
})

//Delete Post

router.delete('/getPostById/:postid',auth,async (req,res,next)=>{
    try {
        const post = await Post.findById(req.params.postid);
        if(!post)
        {
            return res.status(404).json({msg: 'Post Not Found'});
        }
        if(post.user.toString()!==req.user.id)
        {
            return res.status(404).json({msg: 'User Not Authorized'});
        }
        else
        {
           await post.remove();
        }
        return res.json({"msg":'Post Removed'});

    } catch (error) {
        console.log(error);
        return res.status(500).json('Server Error');
    }
})

//Adding Like to a post
module.exports=router