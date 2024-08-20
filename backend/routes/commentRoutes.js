const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authController = require('../controllers/authController');

router.use(authController.protect);
router.post('/reply', commentController.createReply);

router.post('/', commentController.createComment);

router.patch('/:id', commentController.updateComment);

router.delete('/:id', commentController.deleteComment);

router.get('/:id', commentController.getComment);

router.post('/rating', commentController.addRatingToComment);

router.post('/like/:id', commentController.likeComment);

router.post('/dislike/:id', commentController.dislikeComment);



router.get('/post/:postId', commentController.getCommentsForPost);

module.exports = router;
