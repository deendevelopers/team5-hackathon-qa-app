const MongoClient = require('mongodb').MongoClient;
const uri = process.env.db_uri;
const client = new MongoClient(uri, { useNewUrlParser: true });


exports.addUserToApp = function(req, res){
    client.connect(err => {
        const userCollection = client.db("MosqueQA").collection("Users");
        var jsonData = {}; // pass in request directly??
        jsonData.name = req.name;
        jsonData.email = req.email;
        jsonData.role = req.role;
        
        userCollection.insertOne(jsonData, function(err, response){
            if (err) throw err;
        });

        client.close();
    });
}

exports.getUserById = function(req, res){
    client.connect(err => {
        const userCollection = client.db("MosqueQA").collection("Users");
        var searchKey = req.userId
        
        userCollection.find({"content._id": {searchKey}}).toArray(function(err, response){
            if (!err){
                res.send(response)
            }
        })

        client.close();
    });
}

exports.addQuestionToQuestionTable = function(req, res){
    client.connect(err => {
        const questionCollection = client.db("MosqueQA").collection("Question");
        var jsonData = {}; // pass in request directly??
        jsonData.category = req.category;
        jsonData.question_text = req.question_text;
        jsonData.status = req.status;
        jsonData.userId = req.userId;
        
        questionCollection.insertOne(jsonData, function(err, response){
            if (err) throw err;
        });

        client.close();
    });
}

exports.getQuestionById = function(req, res){
    client.connect(err => {
        const questionCollection = client.db("MosqueQA").collection("Question");
        var searchKey = req.userId
        
        questionCollection.find({"content._id": {searchKey}}).toArray(function(err, response){
            if (!err){
                res.send(response)
            }
        })

        client.close();
    });
}