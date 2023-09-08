const Joi = require('joi');

const schemaUser = Joi.object({
    name: Joi.string().alphanum().min(5).max(20).required(),


    lastname: Joi.string().alphanum().min(5).max(20).required(),
    

    email: Joi.string().email().min(10).max(20).required().messages({
        'string.email': "Please enter an valid email",
        'string.min': "email must be at least 10 characters",
        'string.max': "email must be at most 20 characters",
        'string.empty': "Please enter your email",
        'any.required': "Please enter your email"
    }), 


    password: Joi.string().alphanum().min(6).max(20).required(), 


    photo: Joi.string().uri(),


    country: Joi.string().min(5).max(20).required(),


  
})


const verifyDataCity = (req, res, next) =>{

    let { country, name, photo } = req.body 
    if (!country || !name || !photo) {
        return res.status(400).json({
            message: 'Invalid information'
        })
    }
    if (country == "" ){
        return res.status(400).json({
            message: 'Invalid country'
    })}
    if (name == "" ){
        return res.status(400).json({
            message: 'Invalid name'
    })}
    if (photo == "" ){
        return res.status(400).json({
        message: 'Invalid photo'
        })
    }

next()
}


const verifyAuthData = (req, res, next) => {
  const payload = req.body;
  const userValidated = schemaUser.validate(payload,{abortEarly:false});

  if(userValidated.error){
    return res.status(400).json({message: userValidated.error.details.map((err) => err.message)})
  }
  next()
};


module.exports = {
    verifyDataCity,
    verifyAuthData
}



