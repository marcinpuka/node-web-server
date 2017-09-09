const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var port = process.env.PORT || 3000; 
var app = express();


//---set up templating enginge and USE middleware ---//
app.set("view engine", "hbs"); //views is the default directory
hbs.registerPartials(__dirname + "/views/partials");


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    
    fs.appendFile("server.log", log + "\n", (err) => {
     if(err){
         console.log("unable to append to server.log");
     }   
    });
    next();
});

//app.use((req, res, next) => {
//   res.render('maintenance.hbs'); 
//});

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", ()=>{
   return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text)=>{
   return text.toUpperCase(); 
});


//--- register a handler ---//
app.get("/", (req, res) => { 
    // res.send("Hello Express!");
    /*
    res.send({
        name: "Marcin", 
        likes: [
            "Sports", 
            "Cities"
        ]
    });
    */
    res.render("home.hbs", {
       pageTitle: "Home", 
       content: "I got that SWAGGG!!!",     
    });
});


app.get("/about", (req, res)=>{
    res.render("about.hbs", {
        pageTitle: "About Page with Handlebars", 
    });
});

app.get("/bad", (req, res)=> {
    res.send({
        errorMessage: "Unable to handle a request"
    });
});

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});