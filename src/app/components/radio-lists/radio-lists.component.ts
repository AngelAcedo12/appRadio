import { Component, computed, Input, OnInit, signal, Signal } from '@angular/core';
import { RadioBrowserApi, Station } from 'radio-browser-api';

@Component({
  selector: 'app-radio-lists',
  templateUrl: './radio-lists.component.html',
  styleUrl: './radio-lists.component.css'
})
export class RadioListsComponent implements OnInit{

  ngOnInit(): void {
    this.page = 1
    this.loadRadios()
  }

  api : RadioBrowserApi = new RadioBrowserApi("My radio")

  radios: Station[] | undefined
  page : number = 1
  loading :Signal<boolean>  = signal(false)
  totalEmision: number = 0
  countryCode: Signal<string> = signal("ES")


  async loadRadios(){
   
  if(this.page<=1){
    if(this.loading()!=true){
      this.loading=computed(() => true);
      await this.api.searchStations({
        countryCode:this.countryCode(),
        offset:0,
        limit:50
      }).then(data => {this.radios=data; this.page = this.page+1; this.loading=computed(()=>false); })
    }
 
 
  }else{
    if(this.loading()!=true){
      this.loading=computed(() => true);
      await this.api.searchStations({
        countryCode:this.countryCode(),
        offset:this.page*50,
        limit:50
      }).then(data => { this.radios=this.radios?.concat(data);  this.page= this.page+1;computed(()=>false)})
    }
 
  }
  }
  setCountryCode(countryCode:string){
    this.countryCode=computed(()=>countryCode)
    this.page=1;
    this.loadRadios()

  }
}

