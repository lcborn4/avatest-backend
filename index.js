const express = require('express')
const app = express()
const port = 3000

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

app.get('/info', (req,res)=>{

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
    "sources": "string, the url of a github repository including your backend sources and your frontend sources"
  }
  res.status(200).send(message);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})