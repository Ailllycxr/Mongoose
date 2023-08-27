const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText:{
      type:String, 
      required: true
    },
    createAt: {
      type: Date, 
      default: Date.now
    },
    username: {type: String},
    reactions: [Reaction]
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


