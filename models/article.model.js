//title, desc, author, timestamps: true, thumbnailurl: string

const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength:[10, "title must be 10 characters long!"]
    },
    desc: {
        type: String,
        required: true,
        minlength:[10, "description must be 10 characters long!"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    thumbnailurl: {
        type: String,
        required: true
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    }],
}, {timestamps: true}
)

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
