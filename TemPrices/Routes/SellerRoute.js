const express = require('express')
const router = express.Router()
const {validateSellers, registerSeller, loginSeller, validateLogin} = require("../Controllers/SellerController");
const {authMiddleware, logout} = require("../authMiddleWare")


router.post("/register",validateSellers,registerSeller)
router.post("/login", validateLogin,loginSeller )
//this get request is made after the login to access seller-only data
router.get("/dashboard", authMiddleware, (req, res) => {
    res.json({ message: `Welcome seller ${req.user.id}, ${req.user.name}`})
})
router.get("/logOut", logout)


module.exports = router;

