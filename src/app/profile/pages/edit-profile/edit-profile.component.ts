import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  constructor(private userService : UserService,private activeData: ActivatedRoute) {

    this.activeData.queryParams.subscribe((params)=>{
      let name = params["name"]
      this.formProfile.controls.name.setValue(name)
    })

    
   }

   formProfile = new FormGroup({
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(1),
      ]),
    

  })
  imgProfileSelected = 0;
  

  changeImgProfile(imgProfileSelected: string){
    this.imgProfileSelected = Number.parseInt(imgProfileSelected);
  }
  isInvalid(controlName: string) {
    return this.formProfile.get(controlName)?.invalid && this.formProfile.get(controlName)?.touched

  }
  getErrorMessage(controlName: string) {
    return this.formProfile.get(controlName)?.hasError('required') ? 'Valor requerido' :
        this.formProfile.get(controlName)?.hasError('pattern') ? 'La contraseña debe contener al menos 8 caracteres, una letra, un número y un caracter especial' :
          '';
  }

  editProfile(){
    let name = this.formProfile.controls.name.value
  
     this.userService.editProfile(name,this.imgProfileSelected.toString())
  }

}
