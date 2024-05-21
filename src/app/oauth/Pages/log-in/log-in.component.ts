import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OauthService } from '../../../services/oauth.service';
import { CookieService } from 'ngx-cookie-service';
import { NotificationService } from '../../../services/notification-service.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  private notificationService = inject(NotificationService)
  private oauthService = inject(OauthService)
  private cookieService = inject(CookieService)
  
  formGroup = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  })

  loading = signal(false)
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
    this.loading.update(() => true)
    event?.preventDefault()
    const email = this.formGroup.value.email
    const password = this.formGroup.value.password

    if((email!=undefined || email!=null) && (password!=undefined || password!=null) ){

       this.oauthService.login(email,password).pipe(
        catchError(err => {
          this.notificationService.openSnackBar({
            message: "Email o contraseña incorrectos",
            duration: 2000,
          })
          this.loading.update(() => false)
          return err
        })
       ).subscribe(res=>{ 
          this.loading.update(() => false)
          let token = res.token
          this.veriftyToken(res, token)

      
      })
    }
  }

  veriftyToken(res: any, token: string){
    if (res.result.status == true) {
            
      this.cookieService.set("oauth-token-app-radio", token, { path: "/", expires: 300 })
      this.oauthService.userSave = computed(() => res.result.user) 
      this.oauthService.logInState.update(() => true) 
      this.notificationService.openSnackBar({
        message: "Bienvenido",
        duration: 2000,
      })
      
      window.location.href = "radio"
      
    } else {

      this.oauthService.userSave = computed(() => undefined) 
      this.oauthService.logInState.update(() => false) 
      this.formGroup.reset()
      
    }
  }
 }


