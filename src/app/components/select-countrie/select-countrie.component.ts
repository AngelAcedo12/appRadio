import { Component, computed, EventEmitter, Output } from '@angular/core';
import { CountrysService } from '../../services/countries.service';

import { Country } from '../../models/Country';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-countrie',
  templateUrl: './select-countrie.component.html',
  styleUrl: './select-countrie.component.css'
})
export class SelectCountrieComponent {

  @Output() newCountry = new EventEmitter<string>()
  
  constructor(public countriesService : CountrysService,){
    this.loadCoutries()
  }
  countrySelecter = new FormControl("Spain")


  countries :Country[] | undefined;

  emitCountrySelected(){  
    console.log(this.countrySelecter.value)
    this.countriesService.shearchCountry(this.countrySelecter.value ?? "Spain").subscribe((data) => {
    

      if(data!=undefined){
        //this.countriesService.actualSearchCountry = computed(()=>data[0])
        this.newCountry.emit(this.countrySelecter.value ?? "Spain")
      }
    }) 
   
  }

  loadCoutries(){
    this.countriesService.loadCountries()
  }

}
