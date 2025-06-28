const express = require('express')
const { createArticle, getArticleById, getAllArticle, deleteArticleById, getArticlesByUserId } = require('../controllers/article.controller')
const { checkAuth } = require('../middlewares/auth.middleware')
const router = express.Router()

router.post("/create",checkAuth ,createArticle) // create one article
router.get("/all",checkAuth, getAllArticle) // get all article
router.get("/:id",checkAuth, getArticleById) // get one article with id
router.get("/user/:userId", checkAuth, getArticlesByUserId); // get all articles by a specific user
router.delete("/:id",checkAuth, deleteArticleById) // delete one article



module.exports= router