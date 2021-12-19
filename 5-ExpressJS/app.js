const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('Inside the middleware')
    next(); //Allow to request to continue to the next middleware below this middleware in line.
});
app.use((req, res, next) => {
    console.log('Inside another middleware');
    //Headers is automatically setby express
    res.send('<h1>Hello From Express</h1>')
});

//use allow us to add middleware function
//next is a function passed to the arrow function which will be exectured after the arrow function

app.listen(3000);