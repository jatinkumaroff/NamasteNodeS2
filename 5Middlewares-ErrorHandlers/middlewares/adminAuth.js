const isAdmin = (req,res,next)=>{
    const tokenReceived="xyz" //assuming it. we'll get it from user
    const isAuthorised= tokenReceived == "xyz"
    if(!isAuthorised){
      return  res.status(401).send("Unauthorised")
    }else{
        next();
    }    
}

module.exports ={isAdmin}