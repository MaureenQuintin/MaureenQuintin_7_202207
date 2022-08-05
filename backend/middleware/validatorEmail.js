const validator = require('validator');

// Validation de l'email (format)
module.exports=(req,res,next)=>{
    const email= req.body.email
    if(validator.isEmail(email)===true){
    next()
    }else {
    return res.status(401).json({ error: 'Email invalide !' })
    }
}