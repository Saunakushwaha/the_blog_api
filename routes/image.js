const express = require('express');
const imageController = require ('../controller/image.controller');
const imageUploader = require('../helper/image-uploader');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/upload', checkAuth.checkAuth, imageUploader.upload.single('image'), imageController.upload)

module.exports = router;