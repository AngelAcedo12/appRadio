import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  formGroup = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  })

  statePassword = signal(false)
  setStatePassword(){
    this.statePassword.update(()=> this.statePassword()==false ? true : false) 
    if(this.statePassword()===false){
      document.getElementById("input_password")?.setAttribute("type","password")     
    }else{
     document.getElementById("input_password")?.setAttribute("type","text")     

    }
 }

}
