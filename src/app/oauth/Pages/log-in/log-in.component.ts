import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OauthService } from '../../../services/oauth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  private oauthService = inject(OauthService)
  private cookieService = inject(CookieService)

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
 async logIn(){
    event?.preventDefault()
    const email = this.formGroup.value.email
    const password = this.formGroup.value.password
    console.log(email,password)
    if((email!=undefined || email!=null) && (password!=undefined || password!=null) ){

       this.oauthService.login(email,password).subscribe(res=>{ 
        
          let token = res.token
        
          if (token != null) {

            this.cookieService.set("oauth-token-app-radio", token, { path: "/", expires: 1 })

          }
          if (res.result.status == true) {
            this.oauthService.userSave = computed(() => res.result.user) 
            this.oauthService.logInState.update(() => true) 
            window.location.href = "radio"
            
          } else {
            this.oauthService.userSave = computed(() => undefined) 
            this.oauthService.logInState.update(() => false) 
            this.formGroup.reset()
          }

      
      })
    }
  }
 }

