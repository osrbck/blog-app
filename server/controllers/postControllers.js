const Post = require('../models/postModel')
const User = require('../models/userModel')
const fs = require('fs')
const path = require('path')
const {v4: uuid} = require('uuid')
const HttpError = require("../models/errorModel")


// ========================== CREATE A POST
// POST : api/posts
// PROTECTED
const createPost = async (req, res, next) => {
    try {
        let {title, category, description} = req.body;
        if(!title || !category || !description || !req.files){
            return next(new HttpError("Fill in all fields and choose thumbnail.", 422));
        }

        const {thumbnail} = req.files;
        if(thumbnail.size > 2000000){
            return next(new HttpError("Thumbnail too big. File should be less than 2mb.", 422));
        }

        let fileName;
        fileName = thumbnail.name;
        let splittedFileName = fileName.split('.')
        let newFileName = splittedFileName[0] + uuid() + "." + splittedFileName[splittedFileName.length -1]
        thumbnail.mv(path.join(__dirname, '..', '/uploads', newFileName), async (err) => {
            if(err){
                return next(new HttpError(error));
            } else{
                const newPost = await Post.create({title, category, description, thumbnail : newFileName, creator: req.user.id})
                if(!newPost){
                    return next(new HttpError("Post could not be created.", 422));
                }

                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser.posts + 1;
                await User.findByIdAndUpdate(req.user.id, {posts: userPostCount});

                res.status(201).json(newPost);
            }
        })
    } catch (error) {
        return next(new HttpError(error));
    }
}

// ========================== GET All POST
// GET : api/posts
// PROTECTED
const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({updatedAt: -1})
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(error));
    }
}

// ========================== GET SINGLE POST
// GET : api/posts/:id
// PROTECTED
const getPost = async (req, res, next) => {
    try {
        const postID = req.params.id;
        const post = await Post.findById(postID);
        if(!post)
            return next(new HttpError("Post not found.", 404));
        res.status(200).json(post);
    } catch (error) {
        return next(new HttpError(error));
    }
}

// ========================== GET POSTS BY CATEGORY
// GET : api/posts/categories/:category
// UNPROTECTED
const getCatPosts = async (req, res, next) => {
    try {
        const {category} = req.params;
        const catPosts = await Post.find({category}).sort({createdAt: -1})
        res.status(200).json(catPosts)
    } catch (error) {
        return next(new HttpError(error));
    }
}

// ========================== GET AUTHOR'S POSTS
// GET : api/posts/users/:id
// UNPROTECTED
const getUserPosts = async (req, res, next) => {
    try {
        const {id} = req.params;
        const posts = await Post.find({creator: id}).sort({createdAt: -1});
        res.status(200).json(posts);
    } catch (error) {
        return next(new HttpError(error));
    }
}

// ========================== EDIT POST
// PATCH : api/posts/:id
// PROTECTED
const editPost = async (req, res, next) => {
    res.json("Edit post")
}

// ========================== DELETE POST
// POST : api/posts/delete/:id
// PROTECTED
const deletePost = async (req, res, next) => {
    res.json("Delete post")
}

module.exports = {createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost}