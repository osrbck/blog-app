const bcrypt = require('bcryptjs')

const User = require('../models/userModel')
const HttpError = require("../models/errorModel")


// ========================== REGISTER A NEW USER
// POST : api/users/register
// UNPROTECTED
const registerUser = async (req, res, next) => {
    try {
        const {name, email, password, password2} = req.body;
        
        if(!name || !email || !password){
            return next(new HttpError("Fill in all fields.", 422))
        }

        const newEmail = email.toLowerCase();

        const emailExists = await User.findOne({email: newEmail});

        if(emailExists){
            return next(new HttpError("Email allready exists.", 422));
        }

        if((password.trim()).length < 6){
            return next(new HttpError("Password should be at least 6 characters.", 422));
        }

        if(password != password2){
            return next(new HttpError("Passwords do not match.", 422));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await User.create({name, email: newEmail, password: hashedPass})
        res.status(201).json(newUser);


    } catch (error) {
        return next(new HttpError("User registration failed.", 422));
    }
}



// ========================== LOGIN  A RESIGTERED USER
// POST : api/users/login
// UNPROTECTED
const loginUser = async (req, res, next) => {
    res.json("Log In User")
}


// ========================== USER PROFILE
// POST : api/users/users/:id
// PROTECTED
const getUser = async (req, res, next) => {
    res.json("User Profile")
}


// ========================== CHANGE USER AVATAR
// POST : api/users/change-avatar
// PROTECTED
const changeAvatar = async (req, res, next) => {
    res.json("Change User Avatar")
}



// ========================== EDIT USER DETAILS
// POST : api/users/edit-user
// PROTECTED
const editUser = async (req, res, next) => {
    res.json("Edit User Details")
}



// ========================== GET AUTHORS (USERS)
// POST : api/users/authors
// UNPROTECTED
const getAuthors = async (req, res, next) => {
    res.json("Get All users/authors")
}



module.exports = {registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors}