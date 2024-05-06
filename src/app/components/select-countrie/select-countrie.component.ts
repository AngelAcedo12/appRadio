import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() newCountryByName = new EventEmitter<string>()
  constructor(public countriesService : CountrysService,){
    this.loadCoutries()
  }
  countrySelecter = new FormControl("ES")


  countries :Country[] | undefined;

  emitCountrySelected(){  
    var country = this.countrySelecter.value
    this.newCountry.emit(country || "ES")
    if(this.countries!=undefined){

      var  countryName = this.countries.find((item)=>item.cca2==country)?.name.common
      this.newCountryByName.emit(countryName!=undefined ? countryName : "Spain")
    }
  }

  loadCoutries(){
    this.countriesService.loadCountries()
  }

}
