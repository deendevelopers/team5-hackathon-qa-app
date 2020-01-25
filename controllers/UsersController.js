var mongoClient = require('../httpclient/mongoClient');

function getUserById(req, res){
    var userId = req.params.userId;
    res.send(mongoClient.getUserById(userId, null));
    // OR? return mongoClient.getUserById(userId, null);
}

function addUserToDb(req, res){
    var jsonData = {}; 
    jsonData["name"] = req.params.name;
    jsonData["email"] = req.params.email;
    jsonData["role"] = req.params.role;
    res.send(mongoClient.addUserToApp(jsonData, null));
    // or just invoke mongoClient.addUserToApp(jsonData, null)
}