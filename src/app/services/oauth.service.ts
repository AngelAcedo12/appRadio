import { HttpClient } from '@angular/common/http';
import { Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(private http : HttpClient) { }

  state = signal(false)

  register(){

  }

  login(){

  }
  
}
