const express = require('express')
const cors = require('cors')
const app = express()

const port = process.env.PORT || 3000

const { body, validationResult } = require('express-validator');

const controller = require('./controller')();

//cors options
var corsOptions = {
  origin: 'https://web.ava.me',
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

app.get('/', controller.server);
app.get('/ping', controller.ping);
app.get('/info', controller.info);
app.get('/conversations', controller.getConversations);

//example payload
///need these fields
// {
// 	"author": "alice | bob",
// 	"origin": {
//     // Get the latest mutation of the conversation first
//     "alice": "number", // should be incremented if this mutation is requested by alice.
//     "bob": "number" // should be incremented if this mutation is requested by bob.
//   },
// 	"conversationId": // the timestamp when this conversation is created.
// 	"data": {
// 		"type": "insert | delete",
// 		"index": "number", // the start index where the mutation will be applied
// 		"length": "number | undefined", // the length of the text which will inserted or deleted
// 		"text": "string | undefined", // the text which will be inserted or deleted
// 	},
// }

app.post('/mutations',
  body('data.type').isIn(['insert', 'delete']),//. insert or delete(),
  body('data.index').isInt(),// in the boundary
  body('data.text').isString(),// string and exists
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