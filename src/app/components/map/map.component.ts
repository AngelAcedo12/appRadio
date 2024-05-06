import { AfterViewInit, Component, computed, EventEmitter, Input, OnInit, Output } from '@angular/core';
import mapboxgl, { Map } from 'mapbox-gl'
import enviroment from '../../../environments/environment';
import { Coords } from '../../models/Coords';
import { LocationRadiosService } from '../../services/location-radios.service';
import { Station } from 'radio-browser-api';
import { ReproductorServiceService } from '../../services/reproductor-service.service';
import { CountrysService } from '../../services/countries.service';
import { Country } from '../../models/Country';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit{

  @Output() setMapState = new EventEmitter()
  @Input() state : boolean = false
  constructor(private loadRadioService: LocationRadiosService,
     private reproductorService: ReproductorServiceService,
     private countryService: CountrysService) {
    
   }

  

  ngOnInit(): void {

    this.loadLocation()
    
    
  }
  mapIsLoad = false
  location : Coords = {
    lat: 0,
    lon: 0
  }
  actualCountry : string = "Spain" 
  markerList: HTMLElement[] = []

  map : Map | undefined
 async initMap(){
    
    
    mapboxgl.accessToken= enviroment.MAP_BOX_TOKEN;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center:[this.location.lon,this.location.lat],
      zoom: 12
    })
   
   await this.loadRadios()
  
  }
  

setActualCountry(name: string){
  this.actualCountry = name
  this.loadLocation()
}



async loadRadios(){

  if(this.map==undefined){ 
     return
    }
  else{ 
   
    await this.loadRadioService.loadRadiosInCords(this.actualCountry).then(() => {
      var radios =  this.loadRadioService.radios()
     
      if(radios!=undefined){
        radios.forEach((item) => {
     
          if (item.geoLat != undefined && item.geoLong != undefined) {

            var marker = new mapboxgl.Marker(
              {
                element: (() => {
                  const div = document.createElement('div');
                  const img = new Image()
                  img.src = this.getFavicon(item)
                  img.classList.add("marker-img")
                  div.setAttribute("name","marker")
                  div.classList.add("marker");
                 
                  div.appendChild(img)
                
                  return div;
                })()
              }
            ).setLngLat([item.geoLong, item.geoLat]);

            marker.getElement().addEventListener("click", () => {
                this.reproductorService.play(item.url, item)
            })

            if (this.map) {
             
              marker.addTo(this.map);
            }
            this.markerList.push(marker.getElement())
          }
        });
        
      }
    })
  }
  

}
async loadLocation(){

  this.clearMarkers()
  this.countryService.shearchCountry(this.actualCountry).subscribe((data) => {
    
    this.location.lat = data[0].capitalInfo.latlng[0]
    this.location.lon = data[0].capitalInfo.latlng[1]
  
    this.countryService.actualSearchCountry = computed(() => data[0])
    this.initMap()
      
  }
)
  
  
  }

getFavicon(station : Station ){
  return station!.favicon.length>0 ? station?.favicon :  "../../../assets/icons8-radio-50.png"
}

clearMarkers(){
  console.log(this.markerList)
  if(this.markerList.length>0){

  document.getElementsByName('marker').forEach((item) => {
    
    item.remove()
  })
  }
}
closeMap(){

  this.setMapState.emit()
}

}

