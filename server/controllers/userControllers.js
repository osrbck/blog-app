const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const {v4: uuid} = require('uuid')

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
        res.status(201).json(`New User ${newUser.email} registered.`);


    } catch (error) {
        return next(new HttpError("User registration failed.", 422));
    }
}



// ========================== LOGIN  A RESIGTERED USER
// POST : api/users/login
// UNPROTECTED
const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return next(new HttpError("Fill in all fields.", 422))
        }
        const newEmail = email.toLowerCase();

        const user = await User.findOne({email: newEmail})
        if(!user){
            return next(new HttpError("Invalid credentials.", 422))
        }

        const comparePass = await bcrypt.compare(password, user.password)
        if(!comparePass){
            return next(new HttpError("Invalid credentials.", 422))
        }

        const {_id: id, name} = user;
        const token = jwt.sign({id, name}, process.env.JWT_SECRET, {expiresIn: "1d"})
        res.status(200).json({token, id, name})

    } catch (error) {
        return next(new HttpError("Login failed. Please check your credentials.", 422))
    }
}


// ========================== USER PROFILE
// POST : api/users/users/:id
// PROTECTED
const getUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).select('-password');
        if (!user) {
            return next(new HttpError("User not found.", 404))
        }
        res.status(200).json(user);
    } catch (error) {
        return next(new HttpError(error))
    }
}


// ========================== CHANGE USER AVATAR
// POST : api/users/change-avatar
// PROTECTED
const changeAvatar = async (req, res, next) => {
    try {
        if (!req.files || !req.files.avatar) {
            return next(new HttpError("Please choose an image.", 422));
        }
        
        // find user
        const user = await User.findById(req.user.id);

        //delete old avatar if exists
        if (user.avatar) {
            const oldAvatarPath = path.join(__dirname, '..', 'uploads', user.avatar);
            try {
                await fs.promises.unlink(oldAvatarPath); // Use promises to ensure it's awaited
                console.log('Old avatar deleted successfully.');
            } catch (err) {
                console.log('Failed to delete old avatar:', err);
            }
        }

        const { avatar } = req.files;
        
        // check file size
        if (avatar.size > 1500000) {
            return next(new HttpError("Profile picture is too big. Should be less than 1500kb", 422));
        }

        // Create a new unique file name
        const fileExtension = path.extname(avatar.name); // Get the file extension
        const newFileName = `${uuid()}${fileExtension}`;  // Create a unique file name using uuid

        // Move the new avatar to the uploads directory
        avatar.mv(path.join(__dirname, '..', 'uploads', newFileName), async (err) => {
            if (err) {
                return next(new HttpError(err.message, 500));
            }

            // Update user's avatar in the database with the new file name
            const updatedAvatar = await User.findByIdAndUpdate(
                req.user.id, 
                { avatar: newFileName }, 
                { new: true }
            );

            if (!updatedAvatar) {
                return next(new HttpError("Avatar could not be changed.", 422));
            }

            res.status(200).json({ avatar: updatedAvatar.avatar });
        });
        
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};



// ========================== EDIT USER DETAILS
// POST : api/users/edit-user
// PROTECTED
const editUser = async (req, res, next) => {
    try {
        const {name, email, currentPassword, newPassword, newConfirmPasword} = req.body

        if(!name || !email || !currentPassword || !newPassword)
            return next(new HttpError("Fill in all fields.", 422))
        
        //get user from database
        const user = await User.findById(req.user.id);
        if(!user)
            return next(new HttpError("User not found.", 403))
        

        //**EMAIL */
        //make sure new email does not already exist
        const emailExist = await User.findOne({email});
        if(emailExist && (emailExist._id != req.user.id))
            return next(new HttpError("Email already exist.", 422))
        
        //**PASSWORD */
        //compare current password to database password
        const validateUserPassword = await bcrypt.compare(currentPassword, user.password)
        if(!validateUserPassword)
            return next(new HttpError("Invalid current password.", 422))
        //compare new passwords
        if(newPassword != newConfirmPasword)
            return next(new HttpError("New password does not match.", 422))
        //hash new password
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(newPassword, salt)

        //**USER INFO */
        const newInfo = await User.findByIdAndUpdate(req.user.id, {name, email, password: hashed}, {new: true})
        
        res.status(200).json(newInfo)

    } catch (error) {
        return next(new HttpError(error))
    }
}



// ========================== GET AUTHORS (USERS)
// POST : api/users/authors
// UNPROTECTED
const getAuthors = async (req, res, next) => {
    try {
        const authors = await User.find().select('-password');
        res.json(authors);
    } catch (error) {
        return next(new HttpError(error)) 
    }
}



module.exports = {registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors}