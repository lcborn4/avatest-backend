const express = require('express')
const cors = require('cors')
const app = express()

const port = 3000

const { body, validationResult } = require('express-validator');

//cors options
var corsOptions = {
  origin: 'https://web.ava.me',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//helper function
function revisedRandId() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

//to hold the conversations
var conversations = [];

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/ping', (req, res) => {

  let message = {
    "ok": true,
    "msg": "pong"
  };

  res.status(200).send(message);
})

app.get('/info', (req, res) => {

  //need to fill
  let message =
  {
    "ok": true,
    "author": {
      "email": "lcborn4@gmail.com",
      "name": "Logan Born"
    },
    "frontend": {
      "url": "string, the url of your frontend."
    },
    "language": "node.js",
    "sources": "backend: https://github.com/lcborn4/avatest-backend"
  }
  res.status(200).send(message);
})

app.get('/conversations', (req, res) => {

  let message = {
    "ok": true,
    conversations,
  };

  res.status(200).send(message);
})

//example payload
///need these fields
// "type": "insert | delete",
// "index": "number", // the start index you will insert or delete
// "length": "number | undefined", // the length of the text you will insert or delete
// "text": "string | undefined", // the text you will insert or delete
// "author": "alice | bob",
// "origin": {
//   // Get the latest mutation of the conversation first
//   "alice": "number", // should be incremented if this mutation is requested by alice.
//   "bob": "number" // should be incremented if this mutation is requested by bob.
// }

app.post('/mutations',
  body('type').isIn(['insert', 'delete']),//. insert or delete(),
  body('index').isInt(),// in the boundary
  body('length').isInt(),// in the boundary
  body('text').isString(),// string and exists
  body('author').isIn(['alice', 'bob']),// alice or bob
  body('origin').exists(),
  body('origin.alice').isInt(),
  body('origin.bob').isInt(),
  // body('origin') contains alice and bob
  (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ "ok": false, "msg": JSON.stringify(errors.array()), errors: errors.array() });
    }

    let newMutation = {
      "id": revisedRandId().toString(),
      "text": req.body.text,
      "lastMutation": { // The last mutation of this conversation
        "type": req.body.type,
        "index": req.body.index,
        "length": req.body.length,
        "text": req.body.text,
        "author": req.body.author,
        "origin": {
          "alice": req.body.origin.alice,
          "bob": req.body.origin.bob,
        }
      }
    }

    //update array
    conversations[req.body.index] = newMutation;
    let message = {
      "ok": true,
      "text": req.body.text
    }
    let messageStatus = 201;

    res.status(messageStatus).send(message);
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})