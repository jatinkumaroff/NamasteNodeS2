const validator= require('validator')
const validateSignUpData= (req)=>{

    const {firstName,lastName,emailId,password}= req.body

    if(!firstName || !lastName){
         throw new Error("invalid name")
    }else if(firstName.length<4 || firstName>50){
        throw new Error("first name should be betwwen 4 to 50 characterss")
    }else if(!validator.isEmail(emailId)){
        throw new Error("invalid email")
    }
    // else if(!validator.isStrongPassword(password)){
    //     throw new Error('plz enter a strong password : ')
    // }
        
}

module.exports={validateSignUpData}