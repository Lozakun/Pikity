const mongoose = require('mongoose');
const Liga = require('../models/liga.js');
const Equipo = require('../models/equipo.js');

exports.muestraLigas = (req, res, next) => {
    Liga.find({})
    .then(ligas =>{
        console.log(ligas);
        res.render('ligas/ligas', {ligas: ligas, path: 'ligas'});
    })
    .catch(err => {
        console.log(err);
    });
    
}

exports.getAgregaLiga = (req, res, next) => {
    console.log("cayo en agrega liga");
    res.render('ligas/agrega-liga', {path: 'ligas', ligas: Liga});
}

exports.postAgregaLiga = (req, res, next)=>{
    console.log('cayo en post Liga');

    const nombreLiga = req.body.nombreLiga;
    const imagenUrl = req.body.imagenUrl;
    const numEquipos = req.body.numeroEquipos;
    const temp = req.body.temporada;
    const liga = new Liga({
        nombreLiga: nombreLiga,
        imagenUrl: imagenUrl, 
        numEquipos: numEquipos, 
        temp:temp
    });
    liga.save()
    .then(result => {
        console.log('Liga Creada!!', result);
        res.redirect('/ligas');
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getLiga = (req, res, next) => {
    const ligaId = req.params.id;
    console.log("cayó en ver liga");
    Liga.findById(ligaId).populate('equipos').exec()
    .then(result =>{
        console.log(result);
        res.render('ligas/ver-liga', {result: result, path: 'ligas', ligaId: ligaId});
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getEquipos = (req, res, next) =>{
    console.log('Get de equipo individual');
    res.render('equipos/equipos');
}

exports.postAgregaEquipos = (req, res, next) =>{
    console.log('Post de equipos de liga');
    console.log(req.body.equipo);
    const idLiga = new mongoose.Types.ObjectId(req.params.id);
    const equipos = [];
    Liga.findOne({"_id": idLiga}).populate('equipos').exec()
    .then(liga => {
        for(let i = 0; i < req.body.equipo.length; i++){
            console.log(req.body.equipo[i]);
            const equipo = new Equipo({
                nombreEquipo: req.body.equipo[i],
                partidosJugados: 0,
                partidosGanados: 0,
                partidosEmpatados: 0,
                partidosPerdidos: 0,
                golesFavor: 0,
                golesContra: 0,
                golesDiferencia: 0,
                puntos: 0
            });
            equipo.save();
            equipos.push(new mongoose.Types.ObjectId(equipo._id));
        }
        return liga;
    })
    .then(liga => {
        console.log(equipos, liga);
        equipos.forEach(equipo=>{
            liga.equipos.push(equipo);
        });
        liga.save();
        return liga;
    })
    .then(liga => {
        // res.render('../views/ligas/ver-liga', {result: liga, path: 'ligas', ligaId: liga._id});
        res.redirect('/ligas/'+ liga._id);
        console.log("Equipos agregados a Liga", liga);
    })
    .catch(err => {
        console.log(err);
    });
    
    
}

exports.getAgregaEquipo = (req, res, next) => {
    console.log("agregar equipos aqui");
    const liga = Liga.findOne({"_id": mongoose.Types.ObjectId(req.params.idLiga)})
    .then(result => {
        res.render('equipos/agrega-equipos', {path: 'ligas', liga: result});
        console.log(result);
    })
    .catch(err => {
        console.log(err)
    });
}