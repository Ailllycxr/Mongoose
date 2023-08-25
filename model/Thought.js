const mongoose = require('mongoose');
//create the schema


const thoughtSchema = new mongoose.Schema({
    thoughtText:{type:String, required: true},
    createAt: {type: Date, default: date.now},
    username: {type:String, required: true},
    reaction: [reactionSchema]
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
    return this.date.format('yyyy-MM-dd')
  })


const reactionSchema = new mongoose.Schema(
  {
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody:{type:String, required: true},
  userName: {type:String, required: true},
  createdAt: {type: Date, default: date.now},
  },
 {
  toJSON: {
    getters: true,
  },
  id: false,
 }
)

reactionSchema
  .virtual('formatDate')
  .get(function () {
    return this.date.format('yyyy-MM-dd')
  })



