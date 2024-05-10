import { AfterViewInit, Component, computed, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, signal } from '@angular/core';
import mapboxgl, { Map, Marker } from 'mapbox-gl'
import enviroment from '../../../environments/environment';
import { Coords } from '../../models/Coords';
import { LocationRadiosService } from '../../services/location-radios.service';
import { Station } from 'radio-browser-api';
import { ReproductorServiceService } from '../../services/reproductor-service.service';
import { CountrysService } from '../../services/countries.service';
import { Country } from '../../models/Country';
import { of } from 'rxjs';
import { core } from '@angular/compiler';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit, OnChanges{

  @Output() setMapState = new EventEmitter()
  @Output() setFilter = new EventEmitter()
  @Input() state : boolean = false
  @Input({required: true}) actualCountry : string = "Spain" 

  constructor(private loadRadioService: LocationRadiosService,
     private reproductorService: ReproductorServiceService,
     public countryService: CountrysService,
    private notificationService: NotificationService) {
    
   }
  ngOnChanges(changes: SimpleChanges): void {
   this.loadLocation()
  }

  

  ngOnInit(): void {
    this.loadStyle()
    this.addWindowListener()
    this.loadLocation()
    
    
  }

  mapIsLoad = false
  location : Coords = {
    lat: 0,
    lon: 0
  }
  markerList: Marker[] = []
  countries : Country[] | undefined
  map : Map | undefined
  chargeCountry : string = ""
  radiosIsLoad = false
  style = signal("dark")
  isClear = false
 async initMap(){
   mapboxgl.accessToken= enviroment.MAP_BOX_TOKEN;
   
    if(this.mapIsLoad==true){

      this.map?.easeTo(
        {
          center:[this.location.lon,this.location.lat],
          zoom: 5,
          duration:1000,
          essential: true,
          animate: true,
        }
      )

    }else{

      
      let url = "mapbox://styles/mapbox/dark-v11?optimize=true"
      if(this.style()=='dark'){
        url = "mapbox://styles/mapbox/dark-v11?optimize=true"
      }else if(this.style()=='light'){
        url = "mapbox://styles/mapbox/light-v10?optimize=true"
      }
      console.log(url)
      this.map = new mapboxgl.Map({
        container: 'map',
        style: url,
        center:[this.location.lon,this.location.lat],
        zoom: 20,
        preserveDrawingBuffer: true,
        minZoom: 7,
        maxZoom: 20,
        refreshExpiredTiles: true,
      })
      this.map.on('zoom', (event) => {
        if(this.map != undefined){
          if(this.map.getZoom() < 8){
            this.removedMarkers()
          }
          if(this.map.getZoom() > 7 && this.isClear==true){
            
            this.loadMarkersSaved()
          }

        }
         
      })

      this.map.on('style.load', () => {
        this.map?.setFog({}); // Set the default atmosphere style
      });
      
      this.mapIsLoad = true
    }
  
   
   await this.loadRadios()
  
}

  
  

setActualCountry(name : string){
  this.actualCountry = name
  this.loadLocation()
}


async loadRadios(){

    if(this.map==undefined){ 
      return
     }
   else{ 
  
    if(this.chargeCountry!=this.actualCountry || this.markerList.length==0){
      this.radiosIsLoad = false
      this.loadMarkers()
    }
   }
  
  
  

}
async loadLocation(){

  if(this.actualCountry!=this.chargeCountry){

    this.clearMarkers()
  }else{
    
    

  }
  this.countryService.shearchCountry(this.actualCountry).subscribe((data) => {
    
    this.location.lat = data[0].capitalInfo.latlng[0]
    this.location.lon = data[0].capitalInfo.latlng[1]
    this.chargeCountry= data[0].name.common
    this.countryService.actualSearchCountry = computed(() => data[0])
    this.initMap()
      
  }

)
  
  
  }

getFavicon(station : Station ){
  return station!.favicon.length>0 ? station?.favicon :  "../../../assets/icons8-radio-50.png"
}

async clearMarkers(){
  
  if(this.markerList.length>0){

    this.markerList.forEach((item) => {
      item.remove()
    })
    this.markerList = []
  }
  
}


removedMarkers(){

  this.markerList.forEach((item) => {
    item.getElement().classList.replace("no-hidden","hidden")
  })
  this.isClear=true
}
loadMarkersSaved(){

  if(this.markerList.length>0){
    this.markerList.forEach((item) => {
      item.getElement().classList.replace("hidden","no-hidden")
    })
    this.isClear=false
  }

}

closeMap(){

  this.setMapState.emit()
}


async loadMarkers(){
  if(this.markerList.length===0){
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
                img.loading = "lazy"
                img.src = this.getFavicon(item)
                img.classList.add("marker-img")
                div.setAttribute("name","marker")
                div.classList.add("hidden")
                div.classList.add("marker");
                
                div.appendChild(img)
                
                return div;
              })()
            }
          ).setLngLat([item.geoLong, item.geoLat]);

   
          
          marker.getElement().addEventListener("click", () => {

              this.reproductorService.play(item.url, item)
          })
          this.markerList.push(marker)
          if (this.map) {
            marker.addTo(this.map);
          }
        
        }
      });
      this.radiosIsLoad = true
    }

  })
}else{

}
}


changeFilter(){
  this.setFilter.emit()
}


playRandom(){
  

  var radios = this.loadRadioService.radios()

  if(radios!=undefined){
    var random = Math.floor(Math.random() * radios.length)
    this.reproductorService.play(radios[random].url, radios[random])
    var coords : Coords = {
      lat: radios[random].geoLat!,
      lon: radios[random].geoLong!
    }
    if(coords.lat!=undefined && coords.lon!=undefined){
      this.zoomIn(coords)
    }else{
      this.notificationService.openSnackBar({
        message: "No se ha podido cargar la ubicacion de la emisora",
        duration: 2000
      })
    }

  
  }


}

zoomInToStationSelected(name:string){
  var radios = this.loadRadioService.radios()
  if(radios!=undefined){
    var station = radios.find((item) => item.name == name)
    if(station!=undefined){
      var coords : Coords = {
        lat: station.geoLat!,
        lon: station.geoLong!
      }
      if(coords.lat!=undefined && coords.lon!=undefined){
        this.zoomIn(coords)
        
      }else{
        this.notificationService.openSnackBar({
          message: "No se ha podido cargar la ubicacion de la emisora",
          duration: 2000
        })
      }
      this.reproductorService.play(station.url, station)
    }
}
}

// Hace zoom en el mapa a las coordenadas pasadas
zoomIn(coords: Coords){
  if(this.map!=undefined){
    this.map.easeTo(
      {
        center:[coords.lon,coords.lat],
        zoom: 10,
        duration:1000,
        essential: true,
        animate: true,
      }
    )
  }
}

// Carga los nombres  de las emisoras para pasarselas al autocomplete
getKeyWord(){
  return this.loadRadioService.radios()?.map((item) => item.name) || [];
}

loadStyle(){


  if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
    console.log("DARK")
    this.style.update(() => "dark")
  }else{
    console.log("Light")
    this.style.update(() => "light")
  }
}

addWindowListener(){
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {

    this.chageStyleToMap()
  })
}


chageStyleToMap(){

  if(this.style()=="dark"){
    this.style = signal("light")
    this.map?.setStyle("mapbox://styles/mapbox/light-v10")

  }else{
    this.style = signal("dark")
    this.map?.setStyle("mapbox://styles/mapbox/dark-v11")
  }
  this.initMap()
}
}
