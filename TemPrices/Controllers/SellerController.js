const {body, validationResult} = require("express-validator")

const sellerModel = require ("../Models/SellerModel");
const bcrypt = require("bcryptjs")
const sanitizeHtml = require("sanitize-html");
const jwt  = require("jsonwebtoken");

exports.validateSellers = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password required"),
    body("storeName").notEmpty().withMessage("Store name required"),
    body("contactNumber").notEmpty().withMessage("Contact number is required"),
    body("storeDescription").notEmpty().withMessage("Store description required"),
    body("profileImage").optional().isString().withMessage("Profile image must be a string"),
    body("isVerified").isBoolean().withMessage("Must be true or false"),
]   

exports.registerSeller = async (req, res) =>{
    try{
        console.log("initiated")

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const name = sanitizeHtml(req.body.name);
        const email = sanitizeHtml(req.body.email);
        const contactNumber = sanitizeHtml(req.body.contactNumber)
        const password = sanitizeHtml(req.body.password);
        const storeName = sanitizeHtml(req.body.storeName);
        const storeDescription = sanitizeHtml(req.body.storeDescription);
        const profileImage = sanitizeHtml(req.body.profileImage);
        const isVerified = req.body.isVerified === true || req.body.isVerified ==="true";
            

        //1. Check if seller exists
        const existingSeller = await sellerModel.findOne ({ email });
        if (existingSeller){
            return res.status(400). json({message:"Seller already exists"})
        }
        
        //2. Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        //3. Create new seller
        const newSeller = await sellerModel.create({
            name, 
            email, 
            contactNumber,
            password:hashedPassword, 
            storeName,  
            storeDescription,
            profileImage, 
            isVerified
        })
        res.status(201).json({message: "Seller created successfully", newSeller})   
    } catch(error){
        res.status(500).json({error: error.message})
    }
}

exports.validateLogin = [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Passwor is required")
]

exports.loginSeller = async(req, res) => {
//  try{
    console.log("initiated")

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const email = sanitizeHtml(req.body.email);
    const password = sanitizeHtml(req.body.password);

    const seller =  await sellerModel.findOne({ email });
    if (!seller){
      return  res.status(400).json({message: "Invalid credentials"})
    } 
    const isMatch = bcrypt.compare(password, seller.password)
    if(!isMatch){
        return res.status(400).json({message: "Invalid credentials"})
    }
    //JWT payload
    const token = jwt.sign(
        {name: seller.name, id: seller._id},
        process.env.JWT_SECRET,
        {expiresIn: "1d",}
    )

    //This sets a cookie called token on the client's browser.
    res.cookie("token", token, {
        httpOnly: true, //can't be accessed by JS
        secure: false, //set to true in production (with HTTPS)
        sameSite: "strict", //PROTECT AGAINST CSRF
        maxAge: 24*60*60*1000 //1 day
    })
    res.status(200).json({message : "Login successful"})
// } catch(error){
//     res.status(500).json({message: "Server error"})
// }
}
