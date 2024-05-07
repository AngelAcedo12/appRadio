import { Component, computed, inject, Input, OnInit, signal, Signal } from '@angular/core';
import { CountryResult, RadioBrowserApi, Station } from 'radio-browser-api';
import { Country } from '../../models/Country';
import { url } from 'inspector';
import { HistoryService } from '../../services/history.service';
import { CountrysService } from '../../services/countries.service';
import { LocationRadiosService } from '../../services/location-radios.service';

@Component({
  selector: 'app-radio-lists',
  templateUrl: './radio-lists.component.html',
  styleUrl: './radio-lists.component.css'
})
export class RadioListsComponent implements OnInit{


  public historyService = inject(HistoryService)
  public countriesService = inject(CountrysService)
  public locationRadiosService = inject(LocationRadiosService)
  @Input() type : string | undefined

  
  
  
  ngOnInit(): void {
    this.api.setBaseUrl(this.locationRadiosService.baseUrl)
    this.page = 1
    this.selectLoad()
  }
  
  api : RadioBrowserApi = new RadioBrowserApi("My radio")
  radios: Station[] | undefined
  page : number = 1
  loading :Signal<boolean>  = signal(false)
  totalEmision: number = 0
  country: Signal<string> = signal("Spain")
  tagList : Signal<CountryResult[]> = signal([])
  nameStation : Signal<string> = signal('')
  stateMenu : boolean = false
  mapState : boolean = false  
  

  

  async loadHistory(){
    this.historyService.getHistory()
    console.log(this.historyService.history())
  }

  selectLoad(){

    if(this.type=="radio"){

      this.loadRadios()
    }
    if(this.type=="history"){
      this.loadHistory()
    }
  }


  async loadRadios(){
    // FILTROS YA NO UTILIZADOS
   var filterTag = this.tagList().map((item)=>item.name)
  if(this.page<=1){
    if(this.loading()!=true){
      this.loading=computed(() => true);
      await this.api.searchStations({
        name:this.nameStation(),
        nameExact:false,
        country:  this.country() ?? "Spain",
        offset:0,
        limit:50,
        tagExact:false,
        tagList:filterTag,
        order:'votes',
        reverse:true,
        hideBroken:true,

      },{
        mode:'cors',
        cache:'default'
      }
    ).then(data => {
        this.radios=data; this.page = this.page+1; this.loading=computed(()=>false); 
        
      })
    }
 
 
  }else{
    
    if(this.loading()!=true){
      this.loading=computed(() => true);
      await this.api.searchStations({
        name:this.nameStation(),
        nameExact:false,
        country:  this.country() ?? "Spain",
        offset:this.page*50,
        limit:50,
        tagExact:false,
        tagList:filterTag,
        order:'votes',
        reverse:true,
        hideBroken:true,
      },{
        mode:'cors',
        cache:'default',
      }).then(data => { 
        this.radios=this.radios?.concat(data); 
        this.page= this.page+1;computed(()=>false)
        this.loading=computed(() => false)
      })
    }
 
  }
  }
  setRadioName(stationName : string){
    this.nameStation=computed(()=>stationName)
    this.page=1
    this.radios=[]
    this.loadRadios()
  }

  setCountry(countryCode:string){
    this.country=computed(()=>countryCode)
    this.page=1;
    this.radios=[]
    this.loadRadios()
    this.changeStateMenu()

  }
  setTagList(CountryResult : CountryResult[]){
    this.tagList=computed(()=>CountryResult)
    this.page=1;
    this.radios=[]
    this.loadRadios()
    this.changeStateMenu()
  }

  changeStateMenu(){
      if(this.stateMenu==true){
        this.stateMenu=false
      
    }else{
      this.stateMenu=true
    }
  }

  chageStateMap(){
    if(this.mapState==true){
      this.mapState=false
    }else{
      this.mapState=true
    }
  }
}

