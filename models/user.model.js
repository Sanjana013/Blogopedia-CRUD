const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:[3, "name must be atleast 4 characters long"]
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
        match:[/.+@.+\..+/,"Please enter a valid email address"],
        minlength:[10, "email must be atleast 10 characters long"]
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters long"]
    },
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article"
    }],
    likedArticle: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article"
    }],
    token: {
        type: String
    }}, {timestamps: true}
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch(error) {
        next(error);
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

