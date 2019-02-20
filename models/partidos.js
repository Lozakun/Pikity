module.exports = class Partido{
    constructor(numJornada, idLiga, fecha, hora, equipoLocal, equipoVisita){
        this.idPartido = Math.random();
        this.numJornada = numJornada;
        this.idliga = idLiga;
        this.fecha = fecha;
        this.hora = hora;
        this.equipoLocal = equipoLocal;
        this.equipoVisita = equipoVisita;
        this.golesLocal = 0;
        this.golesVisita = 0;
    }
}