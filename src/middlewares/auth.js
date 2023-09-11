const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');

const passportVerificator = passport.use(
    new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "claveSuperSecreta"
    },async(payload, done )=>{

        try{
        let userFounded = await User.findOne({email: payload.email})

        if (userFounded){
            return done(null, userFounded);
        }else{
            done(null)
        }
    }catch(err){
     return done(err)
    }
}
    ));

const hashPassword = (req , res , next) => {

    try {
        const passwordPlain = req.body.password
        const hashPassword = bcrypt.hashSync(passwordPlain, 10)
     
        req.body.password = hashPassword

        next()

    } catch (err) {
        res.status(500).json({ error:err})
    }

};

const verifyPassword = (req , res , next) => {
    const passwordPlain = req.body.password
   
    const hashPassword = req.user.password 

const isValid = bcrypt.compareSync(passwordPlain, hashPassword);
    
if(isValid) {
    next()
}else{
    res.status(400).json({message:"wrong password"})
}

  return isValid
}

const verifyUserExists = async  (req, res , next) => {
    const {email} = req.body

    const userFounded = await User.findOne({email: email})

    if (userFounded){
       req.user = userFounded;
       next();
      
    }else{
        res.status(400).json({message:"user not founded"});
    }
};

const generateToken = (req, res ,next) => {
   try {
   let secretKey = "claveSuperSecreta"
   
    let token=jwt.sign({email: req.body.email}, secretKey, {expiresIn: 60*3})



    req.token = token
    next()

   } catch (error) {
    res.status(500).json({message: error.message});
   }
}



module.exports = {
    hashPassword,
    verifyPassword, 
    verifyUserExists,
    generateToken,
    passportVerificator
}