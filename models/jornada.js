const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jornadaSchema = new Schema ({
    numJornada: {
        type: Number,
        required: true
    },
    liga: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Liga'
    },
    partidos:[{
        type: mongoose.Schema.Types.ObjectId,
        // type: Object
        ref:'Partido'
    }]
});

module.exports = mongoose.model('Jornada', jornadaSchema);

// module.exports = class Jornada{
//     constructor(numJornada, liga){
//         this.numJornada = numJornada;
//         this.liga = liga;
//         this.partidos = [];
//     }
// }