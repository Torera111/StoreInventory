//Add Auth Middleware to protect routes

const jwt = require("jsonwebtoken")

const auth = (req, res, next) =>{
    try{
        const token = req.header("Authorization").replace("Bearer" , "")
        console.log("token:", token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded.userId;
        next();

        console.log("pass")
    } catch (error){
        res.status(401).json({message: "Unauthorized"})
    }
}

exports.authMiddleware = (req, res, next) => {
    /**The browser (or client) sends the JWT back to the server with every request — via a cookie. */
    const token = req.cookies.token;

    if (!token){
        return res.status(401).json(({message: "Unauthorized"}))
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; //you can access the req.user.id in your route
        next();
    } catch (error) {
        res.status(401).json({message: "valid token"})
    }
}
exports.logout = (req, res)=>{
    res.clearCookie("token");
    res.json({message: "Logged out successfully"})
}
