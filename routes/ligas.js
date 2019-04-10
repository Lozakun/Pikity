const express = require('express');
const router = express.Router();
const ligasController = require('../controllers/ligas.js');

router.get('/ligas', ligasController.muestraLigas);

router.post("/ligas", ligasController.postAgregaLiga);

router.get('/ligas/agrega-liga', ligasController.getAgregaLiga);

router.get('/ligas/:id', ligasController.getLiga);

router.get('/ligas/:id/equipos', ligasController.getEquipos);

router.post('/ligas/:id/equipos', ligasController.postAgregaEquipos);

router.get('/ligas/:idLiga/equipos/agrega-equipo', ligasController.getAgregaEquipo);

router.get('/partidos/:idLiga/editar', ligasController.getEditaEquipos);

router.put('/ligas/:idLiga/equipos/editar', ligasController.postEditaEquipos);

module.exports = router;