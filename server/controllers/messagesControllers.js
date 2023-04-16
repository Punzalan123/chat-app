const messageMod = require("../model/messageMod");

module.exports.addMessage = async (req, res, next) => {
    try {
        const {from, to, message} = req.body;
        const data = await messageMod.create({
            message: {text:message},
            users: [from, to],
            sender: from,
        });
        if(data){
            return res.json({msg: "Message added to Database"});
        }else{
            return res.json({msg: "Message not added to database"});
        }

    } catch (err) {
        next(err);
    }

};
module.exports.getAllMessage = async (req, res, next) => {

    try {
        const {from, to} = req.body;
        const messages = await messageMod.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1});

        const projectMessages = messages.map(m => ({
            fromSelf: m.sender.toString() === from,
            message: m.message.text,
        }));
        res.json(projectMessages);

    } catch (err) {
        next(err);
    }

};
