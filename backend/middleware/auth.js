const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config()

async function authenticate(req,res,next) {
    const token = req.headers["authorization"];

    if(!token) {
        return res.status(401).json({message: "No token provided"});
    }

    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);

    if(!decoded){
        return res.status(401).json({ message: 'Invalid token' });
    }

    req.userid = decoded.userid;

    next();
}

module.exports = {authenticate};