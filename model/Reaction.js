const {Schema, Types} = require('mongoose');
const reactionSchema = new Schema(
    {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody:{type:String, required: true},
    userName: {type:String, required: true},
    createdAt: {type: Date, default: Date.now,},
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

    module.exports = reactionSchema;  