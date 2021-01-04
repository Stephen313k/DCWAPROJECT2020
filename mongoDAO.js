//setting up mongo
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
//linking the database so it can be used
const dbName = 'headsOfStateDB'
const collName = 'heads';

//variables of database to make it simpler
var headsOfStateDB
var heads


MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
        //linking the variables so they contain database data
        headsofstateDB = client.db(dbName)
        heads = headsofstateDB.collection(collName)
    })
    .catch((error) => {
        console.log(error)
    })
//get heads of state to display heads of state
var getHeadsOfState = function () {
//new promise has to be conistent with the coordinating promises
    return new Promise((resolve, reject) => {
        //heads.find goes through/retrieves info in the database 
        var cursor = heads.find()
        cursor.toArray()
            .then((documents) => {
                resolve(documents)
            })
        //returning error
            .catch((error) => {
                reject(error)
            })
    })
}
    var addHeadOfState = function(_id, headOfState){
        return new Promise((resolve, reject)=>{
            //_id and headOfState are keys found in the mongodb, must be consistent
            heads.insertOne({"_id":_id, "headOfState":headOfState})
                .then((result)=>{
                    resolve(result)
                })
                .catch((error)=>{
                    console.log(error)
                    reject(error)
                })
        }) 
    }

//delete head of state does not work
var deleteHeadOfState = function(_id){
    return new Promise((resolve, reject)=>{
        heads.deleteOne({"_id":_id})
            .then((result)=>{
                resolve(result)
            })
            .catch((error)=>{
                console.log(error)
                reject(error)
            })
    }) 
}
//returning the methods i created so they can be used in express
module.exports = {getHeadsOfState, addHeadOfState}