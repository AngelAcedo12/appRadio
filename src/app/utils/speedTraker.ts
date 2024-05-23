import { BehaviorSubject, Observable } from "rxjs";
import { Coords } from "../models/Coords";
import { signal } from "@angular/core";

/**
 * @class SpeedTraker
 * @description
 * Esta clase gestiona internamente la velocidad de un vehículo en movimiento y la almacena en un array de coordenadas
 * para luego calcular la velocidad media en un determinado intervalo de tiempo
 * y compararla con un límite de velocidad establecido
 * @example
 * const speedTraker = new SpeedTraker(120);
 * speedTraker.breakSpeedLimit.subscribe((value) => {
 *  if(value) {
 *   console.log('Has superado el límite de velocidad')
 * }
 * })
 *  
 * @param speedLimit - Límite de velocidad en km/h
 * @returns {void}
 * @method calculateSpeed - Calcula la velocidad media en un intervalo de tiempo
 * @method getIntervalCoord - Obtiene las coordenadas del vehículo en un intervalo de tiempo
 * @method breakSpeedLimit - Observable que emite un valor booleano cuando se supera el límite de velocidad
 * @property speed - Velocidad actual del vehículo
 * @property coord - Array de coordenadas del vehículo
 * @property speedLimit - Límite de velocidad en km/h
 * 
 */
export class SpeedTraker  {
    speed = 0;
    coord : Coords[] = []
    speedLimit = -1;
    breakSpeedLimit = new BehaviorSubject<boolean>(false);
    constructor(speedLimit?: number) {
        if (speedLimit) {
            this.speedLimit = speedLimit;
        }
        setInterval(async() => {
            this.getIntervalCoord()
            this.speed = await this.calculateSpeed().then((value) => {
                return value;
            })
            if (this.speed > this.speedLimit && this.breakSpeedLimit.value != true) {
                this.breakSpeedLimit.next(true)
            }
            if(this.speed < this.speedLimit ){
                this.breakSpeedLimit.next(false)
            }
            this.coord = []
  
        },5000); 
      

    }
    /*
    * @method getIntervalCoord
    * @description
    * Obtiene las coordenadas del vehículo en un intervalo de tiempo
    * @returns {void}
    *  
    */
    async getIntervalCoord() {

            setInterval(() => {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.coord.push({lat: position.coords.latitude, lon: position.coords.longitude})
                }, (error) => { 
                    console.log(error)
                })
            },500)
            
        }
    /*
    * @method calculateSpeed
    * @description
    * Calcula la velocidad media en un intervalo de tiempo
    * @returns {number}
    */
    async calculateSpeed() {
            
            let sumLon = 0;
            let sumLat = 0;

            for (let i = 0; i < this.coord.length - 1; i++) {
                sumLon += this.coord[i].lon - this.coord[i + 1].lon;
                sumLat += this.coord[i].lat - this.coord[i + 1].lat;
            }
           // console.log(sumLat, sumLon)
            let distance = Math.sqrt(sumLon * sumLon + sumLat * sumLat);
            return  distance / 5;

        }

    }




