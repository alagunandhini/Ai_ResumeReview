const jwt=require("jsonwebtoken");

const authMiddleware=(req,res,next)=>{
    const token=req.headers.authorization;

    if(!token) res.json({message:"no token"});

    try{
        // verify the user token
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        req.userId=decoded.id;
        next();

    }catch{
        res.json({message:"invalid token"})
    }


}

module.exports=authMiddleware;