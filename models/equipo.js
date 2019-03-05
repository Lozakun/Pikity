const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const equipoSchema = new Schema({
    nombreEquipo: {
        type: String,
        required: true
    },
    partidosJugados: Number,
    partidosGanados: Number,
    partidosEmpatados: Number,
    partidosPerdidos: Number,
    golesFavor: Number,
    golesContra: Number,
    golesDiferencia: Number,
    puntos: Number
});

module.exports = mongoose.model('Equipo', equipoSchema);

// module.exports = class Equipo{
//     constructor(nombreEquipo){
//         this.idEquipo = Math.random();
//         this.nombreEquipo = nombreEquipo;
//         this.partidosJugados = 0;
//         this.partidosGanados = 0;
//         this.partidosEmpatados = 0;
//         this.partidosPerdidos = 0;
//         this.golesFavor = 0;
//         this.golesContra = 0;
//         this.golesDiferencia = 0;
//         this.puntos = 0;
//     }
// }