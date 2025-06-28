//text, user, timestamps: true

const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength:[300, "comment shouldn't exceed 300 characters"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    articles:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
        required: true,
    }
}, {timestamps: true}
)

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
