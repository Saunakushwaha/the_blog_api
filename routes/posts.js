const express = require('express');
const postController = require('../controller/post.controllers');
const checkAuthMiddleware = require('../middleware/check-auth');
const router = express.Router();

router.post("/", checkAuthMiddleware.checkAuth, postController.save);
router.get("/:id", postController.show);
router.get("/", postController.index);
router.patch("/:id", checkAuthMiddleware.checkAuth, postController.update);
router.delete("/:id", checkAuthMiddleware.checkAuth, postController.destroy);

module.exports = router;