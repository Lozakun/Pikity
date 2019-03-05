const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const ligas = [];
const ligasRoutes = require('./routes/ligas.js');
const partidosRoutes = require('./routes/partidos.js');
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

app.use(ligasRoutes);
// app.use('/partidos', partidosRoutes);

app.get('/', (req, res, next) => {
    res.render('index', {path: 'index', ligas: ligas} );
});

app.get('/quinielas', (req, res, next) => {
    res.render('quinielas/quiniela', {path: 'quiniela', ligas: ligas});
});


mongoose
.connect('mongodb+srv://lozakun:Loza_Kun22@krenjar-y4wkt.gcp.mongodb.net/pikityDb?retryWrites=true')
.then(result =>{
    app.listen(process.env.PORT)
    // app.listen(4000);
    console.log("Servidor Escuchando...");
})
.catch(err => {
    console.log(err);
});


