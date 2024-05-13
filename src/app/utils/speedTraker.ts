import { BehaviorSubject, Observable } from "rxjs";
import { Coords } from "../models/Coords";
import { signal } from "@angular/core";

// Esta clase gestion internamente la velocidad de un vehiculo en movimiento y la almacena en un array de coordenadas
// para luego calcular la velocidad media en un determinado intervalo de tiempo
// y compararla con un limite de velocidad establecido

export class SpeedTraker  {
    speed = 0;
    coord : Coords[] = []
    speedLimit = -1;
    breakSpeedLimit = new BehaviorSubject<boolean>(false);
    constructor(speedLimit?: number) {
        if (speedLimit) {
            this.speedLimit = speedLimit;
        }
        setInterval(() => {
            console.log("Getting coords")
            this.getIntervalCoord()
            console.log("Calculating speed")
            this.speed = this.calculateSpeed()
            console.log(this.speed)
            console.log(this.coord)
            if (this.speed > this.speedLimit && this.breakSpeedLimit.value != true) {
                this.breakSpeedLimit.next(true)
                console.log("Speed limit breaked")
            }
            this.coord = []
         },5000); 
      

    }
    async getIntervalCoord() {

            setInterval(() => {
                
                navigator.geolocation.getCurrentPosition((position) => {

                    this.coord.push({lat: position.coords.latitude, lon: position.coords.longitude})
                

                }, (error) => { 
                    console.log(error)
                })


            },200)
            
        }
        calculateSpeed() {
            
            let sumLon = 0;
            let sumLat = 0;
            for (let i = 0; i < this.coord.length - 1; i++) {
                sumLon += this.coord[i].lon - this.coord[i + 1].lon;
                sumLat += this.coord[i].lat - this.coord[i + 1].lat;

            }
            console.log(sumLat, sumLon)
            let distance = Math.sqrt(sumLon * sumLon + sumLat * sumLat);
            return  distance / this.coord.length;

        }

    }



