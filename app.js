const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const ligas = [];
const ligasRoutes = require('./routes/ligas.js');
const partidosRoutes = require('./routes/partidos.js');
const authRoutes = require('./routes/auth.js');
const User = require('./models/users');
const mongoose = require('mongoose');
const session = require('express-session');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(
    session({secret: 'my secret', resave: false, saveUninitialized: false})
);

app.use(ligasRoutes);
app.use('/partidos', partidosRoutes);
app.use(authRoutes);

app.use((req, res, next)=>{
    User.findById('5cb522171c9d440000bd86a4')
    .then(user=>{
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
});

app.get('/', (req, res, next) => {
    res.render('index', 
    {
        path: 'index', 
        ligas: ligas,
        isAuthenticated: req.isLoggedIn
    } );
});

app.get('/quinielas', (req, res, next) => {
    res.render('quinielas/quiniela', 
    {
        path: 'quiniela', 
        ligas: ligas,
        isAuthenticated: req.isLoggedIn
    });
});


mongoose
.connect('mongodb+srv://lozakun:Loza_Kun22@krenjar-y4wkt.gcp.mongodb.net/pikityDb?retryWrites=true')
.then(result =>{
    // app.listen(process.env.PORT)
    app.listen(4000);
    console.log("Servidor Escuchando...");
})
.catch(err => {
    console.log(err);
});


