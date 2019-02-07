
module.exports = class Liga {
  constructor(nombre, imagenUrl, numEquipos, temp){
    this.id = Math.random();
    this.nombreLiga = nombre;
    this.imagenUrl = imagenUrl;
    this.numEquipos = numEquipos;
    this.temp = temp;
    this.equipos = [];
  }
}