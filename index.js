//STEPHEN KELLY G00361283
//installing the dependancies
var express = require('express');
var mySQLDAO = require('./mySQLDAO')
var mongoDAO = require('./mongoDAO')
var bodyParser = require('body-parser');
const app = express()

//installing ejs for table view
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//getting homepage
app.get('/', (req, res) => {
   res.sendFile(__dirname + "/views/homePage.html")
})

//connects the list countries data to be displayed
app.get('/listcountries',(req, res)=>{
   mySQLDAO.getCountries()
            .then((result)=>{
                console.log(result)
                //calling ejs file for nice format
                res.render('showCountries', {countries:result})             
            })
            //return error message
            .catch((error)=>{
                res.send(error)
            })
})
//connects the list cities data to be displayed
app.get('/listcities',(req, res)=>{
    mySQLDAO.getCities()
             .then((result)=>{
                 console.log(result)
                 res.render('showCities', {cities:result})
             })
            //return error message
             .catch((error)=>{
                 res.send(error)
             })
 })

 //only shows the specific city 
 app.get('/listcities/alldetails/:city', (req, res)=>{
    mySQLDAO.getCityDetails(req.params.city)
             .then((result)=>{
                 //renders showCitiesDetails.ejs
               res.render('showCitiesDetails',{cities:result})
             })
             .catch((error)=>{
                 res.send(error)
             })
 })
// displaying the head of states in the json database
 app.get('/headOfState', (req, res) => {
    mongoDAO.getHeadsOfState()
    .then((documents)=> {
     //   console.log(documents)
        res.render('headsOfState',{headOfState:documents})
    })
    .catch((error) => {
        res.send(error)
    })
})


app.get('/addHeadOfState', (req, res)=>{
    res.render("addHeadOfState")
})

//this post method allows the data to actually be stored instead of getting data
app.post('/addHeadOfState', (req, res)=>{
    //using req in head of state method because data is to be stored
    mongoDAO.addHeadOfState(req.body._id, req.body.headOfState)
        .then((result)=>{
            //link back to home page
            res.sendFile(__dirname + "/views/homePage.html")
        })
        .catch((error)=>{
           // res.send("notok")
           res.send(error.message)
           
        })
})

// DELETE COUNTRY
 app.get('/listcountries/delete/:country',(req, res)=>{
    mySQLDAO.deleteCountry(req.params.country)
             .then((result)=>{
                 //if country doesn't exist no rows affected means nothing has been deleted
                 if(result.affectedRows == 0){
                     res.send("<H1>Country " + req.params.country + " doesn't exist</H1>")
                 }else{
                     res.send("<h1>Country: " + req.params.country + " .</h1>")
                  }
                res.send(result)
             })
             .catch((error)=>{
                 //checking error message
                if(error.code == "ER_ROW_REFERENCED_2"){
                    //req.params.county shows the specific country that has been clicked, very user friendly
                 res.send("<h3>ERROR cannot delete country: " + req.params.country + " as it has linked cities")
             }
            else{
                //foreign key constraint
                res.send("<h3>Cannot delete " + req.params.country +" as it has linked cities<h3>")
            }})
 })

 //update country NOT WORKING
 app.get('/updateCountries/:country', (req, res)=>{
    mySQLDAO.updateCountry(req.params.country)
        .then((result)=>{
            res.send(result)
        })
        .catch((error)=>{
            res.send(error)
        })
 })
// my port is 5000
app.listen(5000, () =>{
    console.log("5000");
});
