const mongoose = require('mongoose');
const Liga = require('../models/liga.js');
const Jornada = require('../models/jornada.js');
const Partido = require('../models/partidos.js');

exports.getVerCalendario = (req, res, next)=>{
    console.log("entro al get de Calendario");
    const idLiga = req.params.idLiga;
    Liga.findOne({"_id": idLiga})
    .populate('equipos')
    .populate('jornadas')
    .populate('jornadas.partidos')
    .populate('jornadas.partidos.equipoLocal.nombreEquipo')
    .then(liga => {
        Jornada.find({"liga": liga._id})
        .populate('partidos')
        .populate('partidos.equipoLocal.nombreEquipo')
        .populate('partidos.equipoVisita.nombreEquipo')
        // .populate('nombreEquipo')
        .then(jornada =>{
            res.render('../views/partidos/ver-calendario', {path: 'ligas', liga: liga, ligaId: idLiga, jornada: jornada});
        })
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getAgregaPartidos = (req, res, next)=>{
    const ligaId = req.params.id;
    Liga.findOne({"_id": ligaId})
    .populate('equipos')
    .then(liga => {
        console.log(liga);
        res.render('../views/partidos/agregar-partidos', {path: 'ligas', liga: liga, ligaId: ligaId});
    })
    .catch(err => {
        console.log(err);
    }); 
}

exports.postAgregarPartidos = (req, res, next)=>{
    console.log("Entro al Post de Jornada");
    const numJornada = req.body.partido.numJornada;
    const idLiga = req.params.idLiga;
    const partidos = [];
    console.log(idLiga);
    
    const jornada = new Jornada({
        numJornada: numJornada, 
        liga: new mongoose.Types.ObjectId(idLiga)
    });
    jornada.save();

    guardaLiga(req, jornada.numJornada, idLiga)
    .then(results => {
        console.log("then 7 liga:" + results.liga._id + " jornada: "+ results.jor);
        // res.render("../views/partidos/ver-calendario", {path: 'ligas', liga: results.liga, ligaId: idLiga, jornada: results.liga.jornadas});
        res.render('../views/partidos/ver-calendario', {path: 'ligas', liga: results.liga, ligaId: results.liga._id, jornada: results.jor});
    })
    .catch(err=>console.log("Falló: "+ err));

    async function guardaLiga(req, numJornada, idLiga){
        this.idLiga = idLiga;
        this.numJornada = numJornada;
        this.req = req;
    
        const ligaEncontrada = await encuentraLiga();
        const partidosGuardados = await guardaPartido();
        const jornadaGuardada = await guardaJornada(partidosGuardados);
        const ligaActualizada = await actualizaLiga(ligaEncontrada, jornadaGuardada);
        const jornadaEncontrada = await encuentraJornada(jornadaGuardada);
        const LigaActEncontrada = await encuentraLigaActualizada(idLiga);
        const jornadas = await encuentraJornadas(idLiga);

        return {
            liga: LigaActEncontrada,
            jor: jornadas
        }
        
        function encuentraLiga() {
            const liga = Liga.findOne({"_id": idLiga})
            .populate('equipos')
            .populate('jornadas')
            .populate('jornadas.partidos');
            return liga;
        }
        
        function guardaPartido(){
                if(ligaEncontrada.jornadas.length === 0 || (ligaEncontrada.jornadas.filter(lig=>{lig.numJornada = numJornada}).length === 0)){
                    console.log("llego ", ligaEncontrada.jornadas.filter(lig=>{lig.numJornada = numJornada}).length + " numJornada: " + numJornada);
                    for(let i = 0; i < req.body.partido.equipoLocal.length; i++) {
                        const partido = new Partido({
                            numJornada: req.body.partido.numJornada,
                            equipoLocal: req.body.partido.equipoLocal[i],
                            equipoVisita: req.body.partido.equipoVisita[i],
                            fecha: req.body.partido.fecha[i],
                            hora: req.body.partido.hora[i],
                            minutos: req.body.partido.minutos[i],
                            golesLocal: 0,
                            golesVisita: 0
                        });
                        partido.save();
                        partidos.push(new mongoose.Types.ObjectId(partido._id));
                    }
                }
            return partidos;
        }
    
        function guardaJornada(partidosGuardados){
            partidosGuardados.forEach(partido=>{
                console.log(partido);
                jornada.partidos.push(partido);
            });
            jornada.save();
            return jornada;
        }
    
        function actualizaLiga(ligaEncontrada, jornadaGuardada){
            this.ligaEncontrada = ligaEncontrada;
            this.jornadaGuardada = jornadaGuardada;

            ligaEncontrada.jornadas.push(jornadaGuardada);
            ligaEncontrada.save();
            return ligaEncontrada;
        }
    
        function encuentraJornada(jornadaGuardada){
            this.jornadaGuardada = jornadaGuardada;
            const jornadaEncontrada = Jornada.findOne({"_id":jornadaGuardada._id})
            .populate('partidos')
            return jornadaEncontrada;
        }

        function encuentraLigaActualizada(idLiga) {
            const liga = Liga.findOne({"_id": idLiga})
            .populate('equipos')
            .populate('jornadas')
            .populate('jornadas.partidos');
            return liga;
        }

        function encuentraJornadas(idLiga){
            const jornadas = Jornada.find({"liga": idLiga})
            .populate('partidos')
            .populate('partidos.equipoLocal.nombreEquipo')
            .populate('partidos.equipoVisita.nombreEquipo')
            return jornadas;
        }
    }
}