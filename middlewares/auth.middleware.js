const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports.checkAuth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: "Token not found" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Token not found" });
    }

    try {
        const decodedJwtToken = jwt.verify(token, process.env.JWT_SECRET);
        
        if(decodedJwtToken){
            req.user = await User.findOne({ _id: decodedJwtToken._id });
            if (!req.user) {
                return res.status(401).json({ success: false, message: "User not found" });
            }
            next();
        } else {
            return res.status(401).json({ success: false, message: "Unauthorized Access" });
        }
        
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};
