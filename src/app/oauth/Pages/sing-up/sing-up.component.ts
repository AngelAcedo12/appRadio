import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OauthService } from '../../../services/oauth.service';
import { DtoUserSave } from '../../../models/DTOs/DtoUserSave';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.css'
})
export class SingUpComponent {

  private oauthService = inject(OauthService)
  private cookieService = inject(CookieService)


  isInvalid(controlName: string) {
    return this.singUpForm.get(controlName)?.invalid && this.singUpForm.get(controlName)?.touched

  }
  getErrorMessage(controlName: string) {
    return this.singUpForm.get(controlName)?.hasError('required') ? 'Valor requerido' :
      this.singUpForm.get(controlName)?.hasError('email') ? 'No es un email valido' :
        this.singUpForm.get(controlName)?.hasError('pattern') ? 'La contraseña debe contener al menos 8 caracteres, una letra, un número y un caracter especial' :
          '';
  }

  statePassword = signal(false)

  singUpForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/g)
    ])
  })


  setStatePassword() {

    this.statePassword.update(() => this.statePassword() == false ? true : false)

    if (this.statePassword() === false) {

      document.getElementById("input_password")?.setAttribute("type", "password")

    } else {

      document.getElementById("input_password")?.setAttribute("type", "text")

    }
  }
  submit() {
    if (this.singUpForm.invalid) {
      return Object.values(this.singUpForm.controls).forEach(control => {
        control.markAsTouched()
      })
    }
  
    if (this.singUpForm.value == null) {
      return;
    } else {
      const userSave: DtoUserSave = {
        name: this.singUpForm.value.name ? this.singUpForm.value.name : "",
        email: this.singUpForm.value.email ? this.singUpForm.value.email : "",
        password: this.singUpForm.value.password ? this.singUpForm.value.password : ""
      }
      this.oauthService.register(userSave).subscribe((res) => {
      
        console.log(res)
        let token = res.token
        if (token != null) {
  
          this.cookieService.set("oauth-token-app-radio", token, { path: "/", expires: 1 })
          this.oauthService.logInState.update(() => true)
          this.oauthService.userSave = signal(res.result.user)
        }
        console.log(res.result)
        if (res.result.status == true) {
  
          window.location.href = "radio"
          
        }
  
  
      }
      )
    }


  }
}

