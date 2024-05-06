import { AfterViewInit, Component, OnInit } from '@angular/core';
import mapboxgl, { Map } from 'mapbox-gl'
import enviroment from '../../../environments/environment';
import { Coords } from '../../models/Coords';
import { LocationRadiosService } from '../../services/location-radios.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit{

  
  constructor(private loadRadioService: LocationRadiosService) {
    
   }


  ngOnInit(): void {

    this.loadLocation()
    
    
  }

  location : Coords = {
    lat: 0,
    lon: 0
  }

  map : Map | undefined
 initMap(){
    
    
    mapboxgl.accessToken= enviroment.MAP_BOX_TOKEN;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center:[this.location.lon,this.location.lat],
      zoom: 12
    })
    setInterval(async() => {

      this.loadRadios()
    },200)

  }
  
async loadRadios(){
  if(this.map==undefined){ 
     return}
  else{

    await this.loadRadioService.loadRadiosInCords("Spain").then(() => {
      var radios = this.loadRadioService.radios()
   
      if(radios!=undefined){
        radios.forEach((item) => {
      
          if(item.geoLat!=undefined && item.geoLong!=undefined){
            
            var marker = new mapboxgl.Marker().setLngLat([item.geoLong,item.geoLat]);
          
            if (this.map) {
             
              marker.addTo(this.map);
            }
          }
        })
      }
    })
  }
  

}
async loadLocation(){

  window.navigator.geolocation.getCurrentPosition((cords) => {
      
        this.location.lat = cords.coords.latitude
        this.location.lon = cords.coords.longitude
        this.initMap()
        

  })
  
  
  }

}
