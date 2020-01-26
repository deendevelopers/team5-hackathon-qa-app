const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
//const mongoose = require('mongoose');
const uri = "mongodb+srv://MosqueQA:MosqueQA-pass@mosqueqa-qg3mf.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

const connectToDb = async function(){
    await client.connect();
    var userCollection = client.db("MosqueQA-DB").collection("Users");
    return userCollection;
}

exports.addUserToApp = async function(jsonData, res){ 
    var userCollection = await connectToDb();
    userCollection.insertOne(jsonData, function(err, response){
        if (err) throw err;
        //res.status(201);
    });
}

exports.getUserById = async function(searchKey, res){
    var userCollection = await connectToDb();
    var o_id = new mongo.ObjectID(searchKey);
    return userCollection.findOne({"_id": o_id}).then(function(response){
        res.send(response)
    });
}

// exports.addQuestionToQuestionTable = function(req, res){
//     var questionId;
//     client.connect(err => {
//         const questionCollection = client.db("MosqueQA").collection("Question");
//         var jsonData = {}; // pass in request directly??
//         jsonData.category = req.params.category;
//         jsonData.question_text = req.params.question_text;
//         jsonData.status = req.params.status;
//         jsonData.userId = req.params.userId;
        
//         questionCollection.insertOne(jsonData, function(err, response){
//             if (err) throw err;
//             else {
//                 questionId = jsonData._id;
//             }
//         });

//         client.close(); 
//     });

//     // Now create one json entry into QA-Map table

//     client.connect(err => {
//         const qaMapCollection = client.db("MosqueQA").collection("QA-Map");
//         var entryData = {};
//         var listOfEntries = []; 
//         entryData.question_id = questionId; // needed?
//         entryData.from_id = req.params.userId;
//         entryData.to_id = req.params.to_id; // needed? 
//         entryData.messageBody = req.params.question_text;

//         listOfEntries.push(entryData);
        
//         var jsonData = {};
//         jsonData["questionId"] = questionId;
//         jsonData["entries"] = listOfEntries;
        
//         qaMapCollection.insertOne(jsonData, function(err, response){
//             if (err) throw err;
//         });

//         client.close(); 
//     });
// }

// exports.getQuestionById = function(req, res){
//     client.connect(err => {
//         const questionCollection = client.db("MosqueQA").collection("Question");
//         var searchKey = req.params.questionId;
        
//         questionCollection.find({"content._id": {searchKey}}).toArray(function(err, response){
//             if (!err){
//                 res.send(response)
//             }
//         })

//         client.close();
//     }); 
// }

// exports.getQaMapByQuestionId = function(req, res){
//     client.connect(err => {
//         const questionCollection = client.db("MosqueQA").collection("QA-Map");
//         var searchKey = req.params.questionId;
        
//         questionCollection.find({"content.questionId": {searchKey}}).toArray(function(err, response){
//             if (!err){
//                 res.send(response)
//             }
//         })

//         client.close();
//     }); 
// }

// exports.getQaMapByQaMapId = function(req, res){ // Unsure if needed
//     client.connect(err => {
//         const questionCollection = client.db("MosqueQA").collection("QA-Map");
//         var searchKey = req.params.questionId;
        
//         questionCollection.find({"content._id": {searchKey}}).toArray(function(err, response){
//             if (!err){
//                 res.send(response)
//             }
//         })

//         client.close();
//     }); 
// }


// exports.addResponseToQaMap = function(req, res){ // NEEDS WORK
//     client.connect(err => {
//         const questionCollection = client.db("MosqueQA").collection("QA-Map");
//         var searchKey = req.params.questionId;

//         var entryData = {};
//         entryData.question_id = searchKey; // needed?
//         entryData.from_id = req.params.userId; // imams id
//         entryData.to_id = req.params.to_id; // needed? 
//         entryData.messageBody = req.params.messageBody;
        
        
//         questionCollection.find({"content.questionId": {searchKey}}).toArray(function(err, response){
//             if (!err){
//                 res.send(response)
//             }
//         })

//         client.close();
//     }); 
// }

