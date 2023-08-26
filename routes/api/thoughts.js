const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  postThought,
  putThought,
  deleteThought,
  postReaction,
  deleteReaction,

} = require('../../controllers/thoughtsController');


router.route('/').get(getThought).post(postThought);

router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(putThought);

router.route('/:thoughtId/reaction').post(postReaction);

router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction);

module.exports = router;