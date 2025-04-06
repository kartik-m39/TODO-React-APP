const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../model/user");
const dotenv = require("dotenv");

dotenv.config();

async function handleSignup(req,res) {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username: username});
    
    if(existingUser) {
        return res.status(400).json({message: "User already exists "})
    }

    const saltRounds = 12;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if(err){
            return res.status(500).json({message: "Server Error - Something went wrong"})
        }

        const newUser = await User.create({username: username, password: hash})

        if(newUser) {
            return res.status(200).json({message: "User registered"})
        }
        else{
            return res.status(500).json({message: "Server Error - Something went wrong"})
        }
    })
}

async function handleLogin(req,res) {
    const { username, password } = req.body;

    try{
        const existingUser = await User.findOne({username: username});

        if(!existingUser) {
            return res.status(401).json({message: "Invalid Credentials"});
        } 

        bcrypt.compare(password, existingUser.password,async (err,result) => {
            if(err){
                return res.status(500).json({message: "Server Error - Something went wrong"})
            }
            if(result){
                const token = jwt.sign({userid: existingUser._id}, process.env.JWT_SECRET);
                return res.status(200).json({ message: "Login successful", token: token })
            }
            else{
                return res.status(401).json({message: "Invalid Credentials"})
            }
        })
    } catch{
        return res.status(500).json({message: "Server Error - Something went wrong"})
    }
}

module.exports = {
    handleLogin,
    handleSignup,
}