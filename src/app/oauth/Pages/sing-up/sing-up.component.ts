import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.css'
})
export class SingUpComponent  {
  
 


  statePassword = signal(false)
  singUpForm = new FormGroup({
    name : new FormControl('', [Validators.required,Validators.minLength(1)]
    ),
    email : new FormControl('', [Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/g)])
  })


  setStatePassword(){
     this.statePassword.update(()=> this.statePassword()==false ? true : false) 
     if(this.statePassword()===false){
       document.getElementById("input_password")?.setAttribute("type","password")     
     }else{
      document.getElementById("input_password")?.setAttribute("type","text")     

     }
  }
}
