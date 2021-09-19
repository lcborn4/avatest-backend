const express = require('express')
const cors = require('cors')
const app = express()

const port = process.env.PORT || 3000

const { body, validationResult } = require('express-validator');

const controller = require('./controller')();

//cors options
var corsOptions = {
  origin: 'https://web.ava.me',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//to hold the conversations
var conversations = [];

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', controller.server);
app.get('/ping', controller.ping);
app.get('/info', controller.info);
app.get('/conversations', controller.getConversations);

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
  (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ "ok": false, "msg": JSON.stringify(errors.array()), errors: errors.array() });
    }
    next()
  }, controller.mutations)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})