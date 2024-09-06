const fs = require('fs')
const path = require('path')
const {v4: uuid} = require('uuid')

const HttpError = require("../models/errorModel")

const Post = require('../models/postModel')
const User = require('../models/userModel')

// ========================== CREATE A POST
// POST : api/posts
// PROTECTED
const createPost = async (req, res, next) => {
    res.json("Create post")
}

// ========================== GET All POST
// GET : api/posts
// PROTECTED
const getPosts = async (req, res, next) => {
    res.json("Get all posts")
}

// ========================== GET SINGLE POST
// GET : api/posts/:id
// PROTECTED
const getPost = async (req, res, next) => {
    res.json("Get single post")
}

// ========================== GET POSTS BY CATEGORY
// GET : api/posts/categories/:category
// UNPROTECTED
const getCatPosts = async (req, res, next) => {
    res.json("Get posts by category")
}

// ========================== GET AUTHOR'S POSTS
// GET : api/posts/users/:id
// UNPROTECTED
const getUserPosts = async (req, res, next) => {
    res.json("Get user posts")
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