var mongoClient = require('../httpclient/mongoClient');

module.exports = {
    getQuestionById: async function(req, res){
        var questionId = req.body.questionId;
        mongoClient.getQuestionById(questionId, res);
    },

    addQuestionAndQaMapToDb: async function(req, res){
        var jsonData = {}; 
        jsonData["category"] = req.body.category;
        jsonData["question_text"] = req.body.question_text;
        jsonData["status"] = req.body.status;
        jsonData["userId"] = req.body.userId;
        res.send(await mongoClient.addQuestionToQuestionTable(jsonData, null));
    }
}
