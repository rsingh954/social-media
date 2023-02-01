const express = require("express");
const router = express.Router();
const Posts = require('../models/postModel')
const postsController= require('../controllers/postsController')

router.get("/feed", postsController.getFeed)
module.exports = router;