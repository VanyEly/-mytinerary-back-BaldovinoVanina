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
    const {name,lastname,password,email,photo,country} = req.body

    const userFounded = User.findOne({email: email})

    if (userFounded){

      if(verifyPassword(password, userFounded.password)){
       return res.status(200).json({message: "successfull logged in", userFounded: userFounded});
      }else{
        return res.status(400).json({message: "wrong password"});
      }

    }else{
        res.status(400).json({message:e.message});
    }
   } catch (e) {
    res.status(400).json({message:e.message});
   }

};


module.exports = {
    register,
    login
}