import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OauthService } from '../../../services/oauth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  constructor(private oauthService:OauthService){}

  formGroup = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  })

  isInvalid(controlName:string){
    return this.formGroup.get(controlName)?.invalid && this.formGroup.get(controlName)?.touched
  }
  statePassword = signal(false)
  setStatePassword(){
    this.statePassword.update(()=> this.statePassword()==false ? true : false) 
    if(this.statePassword()===false){
      document.getElementById("input_password")?.setAttribute("type","password")     
    }else{
     document.getElementById("input_password")?.setAttribute("type","text")     

    }
 }
  logIn(){
    const email = this.formGroup.value.email
    const password = this.formGroup.value.password
    console.log(email,password)
    if((email!=undefined || email!=null) && (password!=undefined || password!=null) ){

      this.oauthService.login(email,password)
    }
  }
}
