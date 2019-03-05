const mongoose = require('mongoose'),
Equipo = require('./equipo');

const Schema = mongoose.Schema;

const ligaSchema = new Schema({
  nombreLiga: {
    type: String,
    required: true
  },
  imagenUrl: {
    type: String,
    required: true
  },
  numEquipos: {
    type: Number,
    required: true
  },
  temp: {
    type: String,
    required: true
  },
  equipos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipo' 
  }],
  jornadas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jornada' 
  }]
});

module.exports = mongoose.model('Liga', ligaSchema);

// const ligas = [];

// module.exports = class Liga {
//   constructor(nombre, imagenUrl, numEquipos, temp){
//     this.id = Math.random();
//     this.nombreLiga = nombre;
//     this.imagenUrl = imagenUrl;
//     this.numEquipos = numEquipos;
//     this.temp = temp;
//     this.equipos = [];
//     this.jornadas = [];
//   }

//   save(){

//   }
// }