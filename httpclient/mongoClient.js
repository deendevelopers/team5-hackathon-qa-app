const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
//const mongoose = require('mongoose');
const uri = "mongodb+srv://MosqueQA:MosqueQA-pass@mosqueqa-qg3mf.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

const connectToDbUsers = async function(){
    await client.connect();
    var userCollection = client.db("MosqueQA-DB").collection("Users");
    return userCollection;
}

const connectToDbQuestions = async function(){
    await client.connect();
    var questionCollection = client.db("MosqueQA-DB").collection("Question");
    return questionCollection;
}

const connectToDbQaMaps = async function(){
    await client.connect();
    var qaMapCollection = client.db("MosqueQA-DB").collection("QA-Map");
    return qaMapCollection;
}

exports.addUserToApp = async function(jsonData, res){ 
    var userCollection = await connectToDbUsers();
    userCollection.insertOne(jsonData, function(err, response){
        if (err) throw err;
        //res.status(201);
    });
}

exports.getUserById = async function(searchKey, res){
    var userCollection = await connectToDbUsers();
    var o_id = new mongo.ObjectID(searchKey);
    return userCollection.findOne({"_id": o_id}).then(function(response){
        res.send(response)
    });
}

exports.addQuestionToQuestionTable = async function(jsonData, res){
    var questionCollection = await connectToDbQuestions();
    var newQuestionId;
    questionCollection.insertOne(jsonData, function(err, response){
        if (err) throw err;
        newQuestionId = jsonData._id;
    });

    var qaMapCollection = await connectToDbQaMaps();
    var entryData = {};
    var listOfEntries = []; 
    entryData["question_id"] = newQuestionId; // needed?
    entryData["from_id"] = jsonData.userId;
    entryData["to_id"] = "nullString"; // needed? 
    entryData["messageBody"] = jsonData.question_text;

    listOfEntries.push(entryData);
    
    var jsonDataForMap = {};
    jsonDataForMap["questionId"] = entryData.questionId;
    jsonDataForMap["entries"] = listOfEntries;
    
    qaMapCollection.insertOne(jsonDataForMap, function(err, response){
        if (err) throw err;
    });
}

exports.getQuestionById = async function(searchKey, res){
    var questionCollection = await connectToDbQuestions();
    var o_id = new mongo.ObjectID(searchKey);
    return questionCollection.findOne({"_id": o_id}).then(function(response){
        res.send(response)
    });
}


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

