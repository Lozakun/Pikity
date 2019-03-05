const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partidoSchema = new Schema({
    numJornada: {
        type: Number,
        required: true
    },
    idLiga: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Liga'
    },
    fecha: {
        type: Date,
        required: true
    },
    hora: {
        type: Number,
        min: 1,
        max: 24
    },
    minutos: {
        type: Number,
        min: 0,
        max: 59
    },
    equipoLocal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipo'
    },
    equipoVisita: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipo'
    },
    golesLocal: Number,
    golesVisita: Number
});

module.exports = mongoose.model('Partido', partidoSchema);


// module.exports = class Partido{
//     constructor(numJornada, idLiga, fecha, hora, equipoLocal, equipoVisita){
//         this.idPartido = Math.random();
//         this.numJornada = numJornada;
//         this.idliga = idLiga;
//         this.fecha = fecha;
//         this.hora = hora;
//         this.equipoLocal = equipoLocal;
//         this.equipoVisita = equipoVisita;
//         this.golesLocal = 0;
//         this.golesVisita = 0;
//     }
// }