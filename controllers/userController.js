//import model
const { User, Thought, Reaction } = require('../model');

module.exports = {

//get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

//get single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

//create new user
  async postUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // update user
  async putUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }// all the validation need to pass; new: 
      );
      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // delete user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      };
      const thought = await Thought.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({
          message: 'thought created but no user with this id!',
        });
      }
      res.json({message: 'User successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // post friend
  async postFriend(req, res) {
    try {
      const friends = await User.findOneAndUpdate(
        {_id: req.params.userId}, 
        { $addToSet: { friends: req.params.friendId }},
        { runValidators: true, new: true })
        return res.json({friends})
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete friend
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndRemove(
        { _id: req.params.userId },
        { $pull: { friends: { friendsId: req.params.friendsId }}},
        { runValidators: true, new: true }
        );
      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      };
      res.json({message: 'Friend successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
}








