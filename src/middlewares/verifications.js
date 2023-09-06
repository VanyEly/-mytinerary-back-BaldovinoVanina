const Joi = require('joi');

const userShema = Joi.object({
    name: Joi.string().alphanum().min(5).max(20).require(),


    lastname: Joi.string().alphanum().min(5).max(20).require(),
    

    email: Joi.string().email().min(10).max(20).require().message({
        'string.email': "Please enter an valid email",
        'string.min': "email must be at least 10 characters",
        'string.max': "email must be at most 20 characters",
        'string.empty': "Please enter your email",
        'any.required': "Please enter your email"
    }), 


    password: Joi.string().alphanum().min(6).max(20).require(), 


    photo: Joi.string().uri().any(),


    country: Joi.string().min(10).max(20).require(),


  
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
  const userValidated = userShema.validate(payload);

  if(userValidated.error){
    return res.status(400).json({message: userValidated.error.details.map((err) => err.message)})
  }
  next()
};


module.exports = {
    verifyDataCity,
    verifyAuthData
}



