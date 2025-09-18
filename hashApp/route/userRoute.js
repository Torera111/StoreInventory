const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

//Importing the userSchema
const User = require("../model/userModel");

//User login api
router.post('/login', (req, res) =>{
    User.findOne({ email: req.body.email}, 
        function(err, user){
            if (user == null ){
                return res.status(400).json({
                    message: "User not found."
                })
            }
            else{
                if (user.validPassword(req.body.password)) {
                    return res.status(201).json({
                        message: "User Logged In"
                    })
                } 
                else {
                    return res.status(400).send({
                        message: "Wrong password"
                    })
                }
            }
        }


)

});

//User sign up api
router.post('/signup', async (req, res, next )=>{
    //Creating an empty user object
    let newUser = new User()

    //Initiallizes newUser object with request data
    newUser.name = req.body.name

        newUser.email = req.body.email

        //Call setPassword function to hash password
        newUser.setPassword(req.body.password);

         // Save newUser object to database
        await newUser.save((err) =>{
            if(err) {
                return res.status(400).json({message: "Failed to add user"})
            }
            else {
                return res.status(201).json({
                    message: "User added successfully"
                })
            }
           
        }) 
    next()        
})
module.exports = router;