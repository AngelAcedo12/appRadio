import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import enviroment from '../../environments/environment';
import { DtoTranmision, Transmision } from '../models/DTOs/DtoTransmision';

@Injectable({
  providedIn: 'root'
})
export class TransmisionService {

  constructor(private http: HttpClient) { }
  
  transmisionList = signal([] as []);


  getTransmisions(){
     this.http.get<DtoTranmision[]>(`${enviroment.base_url_local}api/transmisions`);
  }

  createTransmision(transmision:Transmision){
    this.http.post(`${enviroment.base_url_local}`,{
      transmision:transmision,

    }).subscribe((data)=>{
      console.log(data)
    })

  }
}
