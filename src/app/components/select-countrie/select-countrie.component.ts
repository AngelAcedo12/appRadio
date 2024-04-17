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

  constructor(private countriesService : CountrysService,){
    this.loadCoutries()
  }
  countrySelecter = new FormControl("ES")


  countries :Country[] | undefined;

  emitCountrySelected(){  
    var country = this.countrySelecter.value
    this.newCountry.emit(country || "ES")
    
  }

  loadCoutries(){
    this.countriesService.loadCountries().subscribe(data => {
      this.countries=data
    })
  }

}
