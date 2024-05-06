import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/Country';

@Injectable({
  providedIn: 'root'
})
export class CountrysService {

  constructor(private htpp:HttpClient) {

    
   }

   urlCountries= "https://restcountries.com/v3.1/all"
   actualSearchCountry: Signal<Country | undefined> = signal(undefined)


   loadCountries(): Observable<Country[]>{
    return  this.htpp.get<Country[]>(this.urlCountries)
   }
   shearchCountry(name: string){
    this.htpp.get<Country[]>(`https://restcountries.com/v3.1/name/${name}`).subscribe((data) => {
      this.actualSearchCountry = computed(() => data[0])
    })
   }


}
