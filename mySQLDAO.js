//installing dependecies needed
const { POINT_CONVERSION_COMPRESSED } = require('constants');
const { response } = require('express');
const mysql = require('promise-mysql');

var pool

//create pool to use geography database
mysql.createConnection({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'123456789',
    database:'geography'    
})
.then((result)=>{
    pool = result
})
.catch((error)=>{
    console.log(error)
});

//display all coutntries
var getCountries = function(){
    //create new promise
    return new Promise((resolve, reject)=>{
        //call pool query
        pool.query("select * from country")
        //accepts promise
        .then((result)=>{
            resolve(result)
        })
        //rejects promise
        .catch((error) =>{
            reject(error)
        })
    console.log("HERE")
    })
}

//specific city details
var getCityDetails = function(cty_code){
    return new Promise((resolve, reject)=>{
        //where cty_code is the part that determines what city the user selected
        pool.query('select * from city where cty_code = "' + cty_code + '"')
        .then((result)=>{
            resolve(result)
        })
        .catch((error)=>{
            reject(error)
        })
    })
}

//deleting country
var deleteCountry = function(co_code){
    return new Promise((resolve, reject)=>{
        //deleting country
        var deleteQuery = {
            sql: 'delete from country where co_code = ?',
            values: [co_code]
        }
        //standard promise layout
        pool.query(deleteQuery)
        .then((result) => {
            resolve(result)
        })
        .catch((error)=>{
            reject(error)
        })
    })
}


//display all cities
var getCities = function(){
    //create new promise
    return new Promise((resolve, reject)=>{
        //call pool query
        pool.query("select * from city")
        //accepts promise
        .then((result)=>{
            resolve(result)
        })
        //rejects promise
        .catch((error) =>{
            reject(error)
        })
    console.log("HERE")
    })
}

//NOT WORKING
var updateCountry = function(co_code){
    return new Promise((resolve, reject)=>{
        var updateQuery = {
            sql: 'update country set co_code = ? where co_code = ?',
            values: [co_code]
        }
        pool.query(updateQuery)
        .then((result)=> {
            resolve(result)
        })
        .catch((eror)=>{
            reject(error)
        })
     }
    )   
}
// exporting the methods
module.exports = {getCountries, getCities, deleteCountry, updateCountry, getCityDetails}