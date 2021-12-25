const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


const rootDir = require('./util/path');
const addUserRoutes = require('./routes/add-user.js');
const userRoute = require('./routes/user.js');


app.use('/add-user', addUserRoutes.route)
app.use('/', userRoute.route);

app.use((req, res, next) => {
    res.send('<h1>Not Found</h1>')
})

app.listen(3000);