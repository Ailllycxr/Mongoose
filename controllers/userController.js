//import model
const { User } = require('../model');

module.exports = {

//get all users
  async getUsers(req, res) {
    console.log("hello")
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
      if (!user) {
        return res.status(404).json({
          message: 'user created, but found no prior user with that ID',
        })
      }
      res.json('Created the application 🎉');
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
      res.json(application);
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
      if (!user) {
        return res.status(404).json({
          message: 'Application created but no user with this id!',
        });
      }

      res.json({message: 'Application successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
