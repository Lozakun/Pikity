const express = require('express');
const router = express.Router();
const Equipo = require('../models/equipo.js');
const ligasController = require('../controllers/ligas.js');

router.get('/ligas', ligasController.muestraLigas);

router.post("/ligas", ligasController.postAgregaLiga);

router.get('/ligas/agrega-liga', ligasController.getAgregaLiga);

router.get('/ligas/:id', ligasController.getLiga);

router.get('/ligas/:id/equipos', ligasController.getEquipos);

router.post('/ligas/:id/equipos', ligasController.postAgregaEquipos);

router.get('/ligas/:idLiga/equipos/agrega-equipo', ligasController.getAgregaEquipo);

// router.get('/partidos/:idLiga/editar', (req, res, next)=>{
//     console.log(req.params.idLiga);
//     const liga = ligas.find(liga=>liga.id == req.params.idLiga);
//     res.render('equipos/edita-equipos',{ path: 'ligas', liga: liga});
// });

// router.put('/ligas/:idLiga/equipos/editar', (req, res, next)=>{
//     const idLiga = req.params.idLiga;
//     const liga = ligas.find(liga=>liga.id == idLiga);
//     console.log(req.body.equipo);
//     for(let i = 0; i < req.body.equipo.length; i++){
//         console.log(liga.equipos[i].nombreEquipo);
//         console.log(req.body.equipo[i]);
//         if (liga.equipos[i].nombreEquipo != req.body.equipo[i]){
//             liga.equipos[i].nombreEquipo = req.body.equipo[i];
//         }
//     }
//     res.render('ligas/ver-liga', {ligas: ligas, path: 'ligas', ligaId: idLiga});
// });

module.exports = router;