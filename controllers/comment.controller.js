const Comment = require("../models/comment.model")
const Article = require("../models/article.model")
// const User = require("../models/user.model")

module.exports.createComment = async(req, res)=>{
    let { text } = req.body
    let userId = req.user._id
    let articleId = req.params.id
    if(!articleId || !text){
        return res.status(400).json({success: false, message:"Blank Comments are not allowed!"})
    }else{
        
        try {
            let newComment = await Comment.create({
                text: text,
                user: userId,
                articles: articleId, 
            });
            

            let article = await Article.findOne({_id : articleId})
            article.comments.push(newComment._id)

            await article.save()

            return res.status(201).json({success: true, message:"New Comment posted successfully!"})
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    }
} 

module.exports.getCommentByArticleId = async(req, res)=>{
    let articleId = req.params.id
    if(!articleId){
        return res.status(400).json({success: false, message:"Id required in params!"})
    }else{
        try {
            let comments = await Comment.find({ articles: articleId }).populate("user", "name");
                return res.status(200).json({success: true, data: comments})
        } catch (error) {
            return res.status(500).json({success: false, message:error.message})
        }
    }
}

module.exports.deleteCommentByArticleId = async (req, res) => {
    let { commentId } = req.params;

    if (!commentId) {
        return res.status(400).json({ success: false, message: "Comment ID is required!" });
    }

    try {
       
        let deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return res.status(404).json({ success: false, message: "Comment not found!" });
        }

        await Article.findByIdAndUpdate(deletedComment.articles, {
            $pull: { comments: commentId }
        });

        return res.status(200).json({ success: true, message: "Comment deleted successfully!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
