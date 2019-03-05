// const express = require('express');
// const router = express.Router;
// const Jornada = require('../models/jornada.js');
// const Partido = require('../models/partidos.js');
// const ligasRoutes = require('./ligas');

// router.use(ligasRoutes);

// router.get('/:id', (req, res, next)=>{
//     const ligaId = req.params.id;
//     res.render('../views/partidos/agregar-partidos', {path: 'ligas', ligas: ligasRoutes.ligas, ligaId: ligaId});
// });

// router.post('/:idLiga/agregaJornada', (req, res, next)=>{
//     console.log("Entro al Post de Jornada");
//     const numJornada = req.body.partido.numJornada;
//     const idLiga = req.params.idLiga;
//     const liga = ligas.find(liga=>liga.id == idLiga);
//     const jornada = new Jornada(numJornada, idLiga);
//     const jornadaRep = liga.jornadas.find(jornada => jornada.numJornada == numJornada);
//     if(!jornadaRep){
//         for (let i = 0; i < req.body.partido.equipoLocal.length; i++){
//             const partido = new Partido(jornada.numJornada, idLiga, req.body.partido.fecha[i], req.body.partido.hora[i], req.body.partido.equipoLocal[i], req.body.partido.equipoVisita[i]);
//             console.log(partido);
//             jornada.partidos.push(partido);
//         }
//         liga.jornadas.push(jornada);
//         console.log(jornada);
//     }
//     res.render("../views/partidos/ver-calendario", {path: 'ligas', ligas: ligas, ligaId: idLiga, jornada: jornada});
// });

// router.get('/:idLiga/editar-jornada/:numJornada', (req, res, next)=>{
//     const idLiga = req.params.idLiga;
//     const liga = ligas.find(liga => liga.id == idLiga);
//     const numJornada = req.params.numJornada;
//     const jornada = liga.jornadas.find(jornada => jornada.numJornada == numJornada);
//     res.render('../views/partidos/editar-jornada', {path: 'ligas', liga: liga, ligaId: idLiga, jornada: jornada, numJornada: numJornada});
// });

// router.put('/:idLiga/editar-jornada/:numJornada', (req, res, next)=>{
//     const idLiga = req.params.idLiga;
//     const numJornada = req.params.numJornada;
//     const liga = ligas.find(liga => liga.id == idLiga);
//     const jornada = liga.jornadas.find(jornada => jornada.numJornada == numJornada);
//     const partidoAct = req.body.partido;
//     console.log(partidoAct);
//     // jornada.partidos.forEach(partido => {
//     //     if(partido != partidoAct){
//     //         partido = partido.map(partidoAct);
//     //     }
//     // });
//     for(let i = 0; i < jornada.partidos.length; i++){
//         if (jornada.partidos[i] != partidoAct[i]){
//             console.log("son diferentes", partidoAct.numJornada);
//             jornada.partidos[i].fecha = partidoAct.fecha[i];
//             jornada.partidos[i].hora = partidoAct.hora[i];
//             jornada.partidos[i].equipoLocal = partidoAct.equipoLocal[i];
//             jornada.partidos[i].equipoVisita = partidoAct.equipoVisita[i];
//         }else{
//             console.log("son iguales");
//         }
//     }
//     res.render("../views/partidos/ver-calendario", {path: 'ligas', ligas: ligas, ligaId: idLiga, jornada: jornada});
// });

// router.get('/:idLiga/ver-calendario', (req, res, next)=>{
//     const idLiga = req.params.idLiga;
//     const liga = ligas.find(liga => liga.id == idLiga);
//     let jornada = liga.jornadas;
//     res.render('../views/partidos/ver-calendario', {path: 'ligas', ligas: ligas, ligaId: idLiga, jornada: jornada});
// });

// module.exports = router;