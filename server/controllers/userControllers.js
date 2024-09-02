// ========================== REGISTER A NEW USER
// POST : api/users/register
// UNPROTECTED
const registerUser = (req, res, next) => {
    res.json("Register User")
}



// ========================== LOGIN  A RESIGTERED USER
// POST : api/users/login
// UNPROTECTED
const loginUser = (req, res, next) => {
    res.json("Log In User")
}


// ========================== USER PROFILE
// POST : api/users/users/:id
// PROTECTED
const getUser = (req, res, next) => {
    res.json("User Profile")
}


// ========================== CHANGE USER AVATAR
// POST : api/users/change-avatar
// PROTECTED
const changeAvatar = (req, res, next) => {
    res.json("Change User Avatar")
}



// ========================== EDIT USER DETAILS
// POST : api/users/edit-user
// PROTECTED
const editUser = (req, res, next) => {
    res.json("Edit User Details")
}



// ========================== GET AUTHORS (USERS)
// POST : api/users/authors
// UNPROTECTED
const getAuthors = (req, res, next) => {
    res.json("Get All users/authors")
}



module.exports = {registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors}