const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/postsController");
const { protect } = require('../middleware/authMiddleWare')

router.get("/:id", postsController.getPost);
// router.route('/').post(upload.single("file"), postsController.createPost);
router.post("/createPost", upload.single("file"), postsController.createPost);

module.exports = router;