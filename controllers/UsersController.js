var mongoClient = require('../httpclient/mongoClient');

module.exports = {
    getUserById: async function(req, res){
        var userId = req.body.userId;
        mongoClient.getUserById(userId, res);
    },
    
    addUserToDb: async function(req, res){
        //var reqData = JSON.parse(req);
        var jsonData = {}; 
        jsonData["name"] = req.body.name;
        jsonData["email"] = req.body.email;
        jsonData["role"] = req.body.role;
        res.send(await mongoClient.addUserToApp(jsonData, null));
        // or just invoke mongoClient.addUserToApp(jsonData, null)
    }
}

