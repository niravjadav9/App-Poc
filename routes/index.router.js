const express = require('express');
const router = express.Router();

const ctrlUser = require('../controller/user.controller');
const ctrlPost = require('../controller/post.controller');


const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate); 
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile); 
router.post('/createPost', jwtHelper.verifyJwtToken, ctrlPost.createPost); 
router.get('/listPost', jwtHelper.verifyJwtToken, ctrlPost.listPost);
router.delete('/delete/:id', jwtHelper.verifyJwtToken, ctrlPost.deletePost); 
router.post('/comment',jwtHelper.verifyJwtToken, ctrlPost.comment); 




module.exports = router;