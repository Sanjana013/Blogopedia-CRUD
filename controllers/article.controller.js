const Article = require("../models/article.model")
const User = require("../models/user.model")

module.exports.createArticle = async(req, res)=>{
    let {title, desc, thumbnailurl } = req.body
    if(!title || !desc || !thumbnailurl){
        return res.status(400).json({success: false, message:"All fields required!"})
    }else{
        let userId = req.user._id
        // let userId = author

        try {
            let newArticle  = await Article.create({
                title: title,
                desc: desc,
                author: userId,
                thumbnailurl: thumbnailurl
            })

            let user = await User.findOne({_id : userId})

            if(!user){
                return res.status(400).json({success: false, message:"User not found!"})
            }
            

            if(!user.articles){
                user.articles = []
            }
            user.articles.push(newArticle._id)
            

            // user.articles.push(newArticle._id)

            await user.save()

            return res.status(201).json({success: true, message:"New Article created successfull!"})
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    }
}
module.exports.getAllArticle = async(req, res)=>{
    try {
        let allArticles = await Article.find({})
        return res.status(200).json({success: true, data: allArticles})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}
module.exports.getArticleById = async(req, res)=>{
    let {id} = req.params
    if(!id){
        return res.status(400).json({success: false, message:"id required in params!"})
    }else{
        try {
            let article = await Article.findOne({_id: id})
            if(!article){
                return res.status(400).json({success: false, message:"Article not found!"})
            }
            return res.status(200).json({success: true, data: article})
        } catch (error) {
            return res.status(500).json({success: false, message:error.message})
        }
    }
}

//get article by userID

module.exports.getArticlesByUserId = async (req, res) => {
    let { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID required in params!" });
    }
    try {
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        let articles = await Article.find({ author: userId });
        return res.status(200).json({ success: true, data: articles });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};




module.exports.deleteArticleById = async(req, res)=>{
    let {id} = req.params
    let userId = req.user._id
    if(!id){
        return res.status(400).json({success: false, message:"id required in params!"})
    }else{
        try {
            await Article.deleteOne({_id: id})

            // delete array item from User
            await User.updateOne(
                {_id : userId},
                {$pull : {articles : id}}
            )

            return res.status(200).json({success: true, message:"Article deleted successful"})
        } catch (error) {
            return res.status(500).json({success: false, message:error.message})
        }
    }
}