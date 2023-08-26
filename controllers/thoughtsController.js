const { Thought } = require('../model');

module.exports = {
 //get all thoughts
 async getThought(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
},


//get single thought
async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No application with that ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
},

//create new thought
async postThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
      if (!thought) {
        return res.status(404).json({
          message: 'thought created, but found no prior thought with that ID',
        })
      }
      res.json('Created the application 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // update thought
  async putThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }// all the validation need to pass; new: 
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // delete thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      //I need to delete the coresponding thoughts too
      const tag = await Thought.findOneAndUpdate(
        { thought: req.params.thoughtId },
        { $pull: { thought: req.params.thoughtId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: 'Application created but no thought with this id!',
        });
      }

      res.json({ message: 'Application successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
}
