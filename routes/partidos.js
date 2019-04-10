const express = require('express');
const router = express.Router();
const calendarioController = require('../controllers/calendario.js');

router.get('/:idLiga/ver-calendario', calendarioController.getVerCalendario);

router.get('/:id', calendarioController.getAgregaPartidos);

router.post('/:idLiga/agregaJornada', calendarioController.postAgregarPartidos);

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

module.exports = router;