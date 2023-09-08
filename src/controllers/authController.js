const User = require("../models/User")
const { verifyPassword } = require("../middlewares/auth")

const register = async (req,res) => {

try {
    const payload = req.body
    const userExists = await User.findOne({email: payload.email})

    if (userExists) {
        return res.status(403).json({message: "User already exists"},)
    }
    const userCreated = await User.create(payload)

    res.status(200).json({message: "User created successfully",
    userCreated
})
} catch (e) {
    res.status(400).json({message:e.message});
}

}

const login =(req, res) => {
   try {
   res.status(200).json({
    message:"Successfully logged in",
    token: req.token,
    user:{
    user: req.user.email,
    _id: req.user._id
    }
})
   }
    catch (e) {
    res.status(400).json({message:e.message});
   }

};


module.exports = {
    register,
    login
}