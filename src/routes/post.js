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
        const posts=await Post.find().sort({date:-1});
        return res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Server Error')
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
router.put('/like/:postid',auth,async(req,res,next)=>{
    console.log('Like Request');
    try {
        const user= await User.findById(req.user.id);
        const post = await Post.findById(req.params.postid);
        if(post.likes.filter((like)=>{return like.user.toString()===req.user.id}).length > 0)
        {
            return res.status(400).json({msg:'Post Already Liked'});
        }
        post.likes.unshift({user:req.user.id,name:user.name});
        await post.save();
        return  res.json(post.likes);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Server Error');
    }
})
//Removing Like to a post
router.put('/unlike/:postid',auth,async(req,res,next)=>{
    console.log('Dislike Request');
    try {
        const user= await User.findById(req.user.id);
        const post = await Post.findById(req.params.postid);
       
        let removeLikeIndex=-1;
        removeLikeIndex= post.likes.map((like)=>like.user.toString()).indexOf(req.user.id);
        if(removeLikeIndex ==-1)
        {
            return res.status(400).json({msg:'Post Not Liked'});
        }
        post.likes.splice(removeLikeIndex,1);
        await post.save();
        return  res.json(post.likes);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Server Error');
    }
})
//Adding Comment to Post
router.post('/addComment/:postid',[auth,[
    check('text','text is required').not().isEmpty()
]], async(req,res,next)=>{

    const errors= validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({msg:'Enter Some Text'});
    }
    try {
        const user =await User.findById(req.user.id);
        const post =await Post.findById(req.params.postid);
        const newComment={
            text:req.body.text,
            user:req.user.id,
            name:user.name,
            avatar:user.avatar
        };
        post.comments.unshift(newComment);
        await post.save();
        return res.json(post.comments);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Server Error');
    }
})
//Delete Comment

router.delete('/deleteComment/:postid/:commentid',auth, async(req,res,next)=>{

    try {
        // const user =await User.findById(req.user.id);
        const post =await Post.findById(req.params.postid);
      
        const comment =  post.comments.find(comment=> comment._id.toString()===req.params.commentid);

        if(!comment)
        {
            return res.status(404).json("Comment does not exist");
        }
        //User who created comment is deleting comment
        if(comment.user.toString()!==req.user.id)
        {
            return res.status(400).json({msg:"User Not Authorized"});
        }
        const removeIndex=post.comments.map(comment=>comment._id.toString()).indexOf(req.params.comment_id);
        post.comments.splice(removeIndex,1);
        await post.save();
        return res.json(post.comments);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Server Error');
    }
})
//Like Comment
router.put('/likeComment/:postid/:commentid',auth, async(req,res,next)=>{
    try {

        const post = await Post.findById(req.params.postid);
        if(!post)
        {
            return res.status(404).json("Post not Found");
        }

        const comment = post.comments.find((comment)=>{return comment._id.toString()=== req.params.commentid});
        if(!comment)
        {
            return res.status(404).json("Comment not Found");
        }

        if(comment.likes.filter((like)=>{return like.user.toString()===req.user.id}).length > 0)
        {
            return res.status(404).json("Comment Already Liked");
        }
        const user= await User.findById(req.user.id);

        comment.likes.unshift({
            user:req.user.id,
            name:user.name
        });
        console.log(comment);
        post.save();
        return res.json(comment.likes);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Server Error');
    }
})
//DisLike Comment 
router.put('/dislikeComment/:postid/:commentid',auth, async(req,res,next)=>{
    try {

        const post = await Post.findById(req.params.postid);
        if(!post)
        {
            return res.status(404).json("Post not Found");
        }

        const comment = post.comments.find((comment)=>{return comment._id.toString()=== req.params.commentid});
        if(!comment)
        {
            return res.status(404).json("Comment not Found");
        }

        if(comment.likes.filter((like)=>{return like.user.toString()===req.user.id}).length === 0)
        {
            return res.status(404).json("Comment Not Liked");
        }
        const removeIndex=comment.likes.map((like)=> like.user.toString()).indexOf(req.user.id);
        
        comment.likes.splice(removeIndex,1);
        post.save();
        return res.json(comment.likes);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Server Error');
    }
})
module.exports=router