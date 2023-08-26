#Social Network API

## Technology Used

| Technology Used |                 Resource URL                 |
| --------------- | :------------------------------------------: |
| Git             | [https://git-scm.com/](https://git-scm.com/) |
| Mongoose        |                                              |

## Description

The exercise is about building up the backend using mongoose.

## Code Refactor Example

Data model:

```Javascript
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

```

Controller:

```Javascript
 async getThought(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
},

```

## Usage

-npm i
-npm start

## Learning Points

1. Setting up backend using Mongoose

## Author Info

### Xiaoran Cai

- [LinkedIn](https://www.linkedin.com/in/xrcai/)
- [Github](https://github.com/Aillycxr)

## Credits

- W3school| [https://www.w3schools.com](https://www.w3schools.com)

## License

Copyright (c). All rights reserved.
Licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.

## Features

The nevigation bar items link to their content repectively
