const {Schema, model} = require('mongoose');
const reaction = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText:{type:String, required: true},
    createAt: {type: Date, default: Date.now},
    username: String,
    reaction:[reaction]
  },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }   
)

thoughtSchema
  .virtual('formatDate')
  .get(function () {
    return this.createAt.toISOString().split('T')[0];
  })


  
const Thought = model('thought', thoughtSchema);
module.exports = Thought;  


