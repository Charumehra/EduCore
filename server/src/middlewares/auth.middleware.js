const jwt = require("jsonwebtoken")

// middleware to protect routes that require authentication
const authInstructor = (req, res, next) =>{
    const token = req.cookies.token
    try{
        // check if JWT token exists in cookies
        if(!token){
            return res.status(401).json({message:"Unauthorized"})
        }
         // verify token and attach user information to request
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded.role!=="instructor"){
            return res.status(403).json({message:"You don't have access"})
        }
        req.user = decoded

        // continue to the controller
        next()
    }
    catch(err){
        return res.status(401).json({message:"Unauthorized"})
    }
}


module.exports = {authInstructor}