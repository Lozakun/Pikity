const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const Liga = require('./models/liga.js');
const ligas = [];
const Equipo = require('./models/equipo.js');
const Jornada = require('./models/jornada.js');
const Partido = require('./models/partidos.js');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

app.get('/', (req, res, next) => {
    res.render('index', {path: 'index', ligas: ligas} );
});

app.get('/ligas', (req, res, next) => {
    res.render('ligas/ligas', {ligas: ligas, path: 'ligas'});
});

app.post("/ligas", (req, res, next)=>{
    const nombreLiga = req.body.nombreLiga;
    const imagenUrl = req.body.imagenUrl;
    const numEquipos = req.body.numeroEquipos;
    const temp = req.body.temporada;
    const liga = new Liga(nombreLiga, imagenUrl, numEquipos, temp);
    ligas.push(liga);
    res.redirect('/ligas');
});

app.get('/ligas/agrega-liga', (req, res, next) => {
    console.log("cayo en agrega liga");
    res.render('ligas/agrega-liga', {path: 'ligas', ligas: ligas});
});

app.get('/ligas/:id', (req, res, next) => {
    const ligaId = req.params.id;
    console.log("cayó en ver liga: ", ligaId);
    res.render('ligas/ver-liga', {ligas: ligas, path: 'ligas', ligaId: ligaId});
});

app.get('ligas/:id/equipos', (req, res, next) =>{
    console.log('Get de equipo individual');
    res.render('equipos/equipos');
});

app.post('/ligas/:id/equipos', (req, res, next) =>{
    console.log('Post de equipos de liga');
    console.log(req.body.equipo);
    const idLiga = req.params.id;
    const liga = ligas.find(liga=>liga.id == idLiga);
    
    for(let i = 0; i < req.body.equipo.length; i++){
        console.log(req.body.equipo[i]);
        let equipo = new Equipo(req.body.equipo[i]);
        liga.equipos.push(equipo);
    }
    console.log(liga.equipos);

    res.render('ligas/ver-liga', {ligas: ligas, path: 'ligas', ligaId: liga.id});
});

app.get('/ligas/:idLiga/equipos/agrega-equipo', (req, res, next) => {
    console.log("agregar equipos aqui");
    const liga = ligas.find(liga=>liga.id == req.params.idLiga);
    res.render('equipos/agrega-equipos', {path: 'ligas', liga: liga});
    console.log(liga);
});

app.get('/partidos/:idLiga/editar', (req, res, next)=>{
    console.log(req.params.idLiga);
    const liga = ligas.find(liga=>liga.id == req.params.idLiga);
    res.render('equipos/edita-equipos',{ path: 'ligas', liga: liga});
});

app.put('/ligas/:idLiga/equipos/editar', (req, res, next)=>{
    const idLiga = req.params.idLiga;
    const liga = ligas.find(liga=>liga.id == idLiga);
    console.log(req.body.equipo);
    for(let i = 0; i < req.body.equipo.length; i++){
        console.log(liga.equipos[i].nombreEquipo);
        console.log(req.body.equipo[i]);
        if (liga.equipos[i].nombreEquipo != req.body.equipo[i]){
            liga.equipos[i].nombreEquipo = req.body.equipo[i];
        }
    }
    res.render('ligas/ver-liga', {ligas: ligas, path: 'ligas', ligaId: idLiga});
});

app.get('/partidos/:id', (req, res, next)=>{
    const ligaId = req.params.id;
    res.render('partidos/agregar-partidos', {path: 'ligas', ligas: ligas, ligaId: ligaId});
});

app.post('/partidos/:idLiga/agregaJornada', (req, res, next)=>{
    const numJornada = req.body.numJornada;
    const idLiga = req.body.idLiga;
    const jornada = new Jornada(numJornada, idLiga);

    const equipoLocal = req.body.equipoLocal;
    const equipoVisitante = req.body.equipoVisitante;

    //estoy generando el partido, agregando correctamente el constructor del partido.
    const partido = new partido(partido.numJornada[i], partido.idLiga, fecha, hora, equipoLocal, equipoVisita, golesLocal, golesVisita);

    console.log(jornada);
    console.log(partido);
});

app.get('/quinielas', (req, res, next) => {
    res.render('quinielas/quiniela', {path: 'quiniela', ligas: ligas});
});

app.listen(4000, (err) => {
    console.log("servidor escuchando");
});
