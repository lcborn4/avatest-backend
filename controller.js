module.exports = () => {

    const helpers = require('./helpers')();

    var conversations = [];

    return {
        server,
        ping,
        info,
        getConversations,
        mutations,
    }

    function server(req, res) {
        return res.status(200).send('Hello World!');
    }

    function ping(req, res) {
        let message = {
            "ok": true,
            "msg": "pong"
        };

        res.status(200).send(message);
    }

    function info(req, res) {
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
    }

    function getConversations(req, res) {

        let message = {
            "ok": true,
            conversations,
        };

        res.status(200).send(message);
    }

    function mutations(req, res) {

        console.log('first mutations', conversations)

        let newMutation = {
            "id": req.body.conversationId,
            "text": req.body.text,
            "lastMutation": { // The last mutation of this conversation
                "type": req.body.data.type,
                "index": req.body.data.index,
                "length": req.body.data.length,
                "text": req.body.data.text,
                "author": req.body.author,
                "origin": {
                    "alice": req.body.origin.alice,
                    "bob": req.body.origin.bob,
                }
            }

        }

        //update array
        conversations[req.body.index] = newMutation;

        console.log('second mutations', conversations)

        let message = {
            "ok": true,
            "text": req.body.text
        }
        let messageStatus = 201;

        res.status(messageStatus).send(message);
    }
}