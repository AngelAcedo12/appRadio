import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  isInvalid(controlName: string) {

    return this.formPassword.get(controlName)?.invalid && this.formPassword.get(controlName)?.touched

  }
  getErrorMessage(controlName: string) {
   
    return this.formPassword.get(controlName)?.hasError('required') ? 'Valor requerido' :
        this.formPassword.get(controlName)?.hasError('pattern') ? 'La contraseña debe contener al menos 8 caracteres, una letra, un número y un caracter especial' : "";
  }

  formPassword= new FormGroup({
    newPassword : new FormControl('',[
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/g)
    ]),
    confirmNewPassword : new FormControl('',[
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/g)
    
    ])
  })

  

  changePassword(){
    let newPassword = this.formPassword.controls.newPassword.value
    let confirmNewPassword = this.formPassword.controls.confirmNewPassword.value
    
    this.userService.changePassword(newPassword,confirmNewPassword)
  }


}
