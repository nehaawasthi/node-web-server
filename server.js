const express = require('express');
const hbs = require('hbs');
const port = process.eventNames.PORT||3000;
hbs.registerPartials(__dirname+'/views');
var app = express();

//............Middleware.............
const fs = require('fs');
app.use((req,res,next) =>{
    var now = new Date().toString();
    var log =`${now} :${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n');
    next();
});

//'''''''''''Maintenance''''''''''''''''''
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

app.set('view engine','hbs')
app.use(express.static(__dirname,('')));

app.get('/',(req ,res) => {
   // res.send('<h1>Hello </h1> welcome to all');
//    res.send({
//        name : 'neha',
//        likes : [
//            'travelling',
//            'paper craft',
//            'listining music'
//        ]
//    });
    res.render('home.hbs',{
      pageTitle :'Home Page',
      welcomeMessage :'Welcome to my website',
      currentYear :new Date().getFullYear()  
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pageTitle :'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad',(req ,res) => {
    res.send({
        errorMessage : 'Unable to handle request'
    });
});

app.listen(port,()=>{
    console.log(`server is up on port ${port}`);
});