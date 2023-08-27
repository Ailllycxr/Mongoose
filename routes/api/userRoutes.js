const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  postUser,
  putUser,
  deleteUser,
  postFriend,
  deleteFriend
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(postUser);

router.route('/:userId').get(getSingleUser).delete(deleteUser).put(putUser);

router.route('/:userId/friend/:friendId').delete(deleteFriend).post(postFriend);

module.exports = router;