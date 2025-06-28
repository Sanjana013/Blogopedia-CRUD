const express = require("express")
const { checkAuth } = require("../middlewares/auth.middleware")
const { createComment, getCommentByArticleId, deleteCommentByArticleId } = require("../controllers/comment.controller")

const router = express.Router()

router.post('/commentCreate/:id',checkAuth,createComment )
router.get('/viewAllComments/:id',checkAuth,getCommentByArticleId )
router.delete('/deleteComment/:commentId', checkAuth, deleteCommentByArticleId);




module.exports = router