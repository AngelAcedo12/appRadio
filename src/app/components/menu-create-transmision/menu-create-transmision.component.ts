import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransmisionService } from '../../services/transmision.service';
import { TransmisionSocketService } from '../../services/transmisionSocket.service';
import { OauthService } from '../../services/oauth.service';
import { title } from 'process';
import { Transmision } from '../../models/DTOs/DtoTransmision';


@Component({
  selector: 'app-menu-create-transmision',
  templateUrl: './menu-create-transmision.component.html',
  styleUrl: './menu-create-transmision.component.css'
})
export class MenuCreateTransmisionComponent {

  private transmisionService = inject(TransmisionService)
  private transmisionSocketService = inject(TransmisionSocketService)
  private oauthService = inject(OauthService)

  @Input({required:true}) state : boolean = true
  @Output() setState = new EventEmitter()
  isValid = false;



  closeDialog(event:Event){
 
    let element : HTMLElement = event.target as HTMLElement
   
    if(element.id==="detected"){
      this.setState.emit()
    }
   
  }

  close(){
    this.setState.emit()
  }

  isInvalid(controlName: string) {
    
    

    return this.formTransmision.get(controlName)?.invalid && this.formTransmision.get(controlName)?.touched

  }
  getErrorMessage(controlName: string) {
    return this.formTransmision.get(controlName)?.hasError('required') ? 'Valor requerido' :
      '';
  }

  

  formTransmision = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  }); 


  createTransmision(){
    event?.preventDefault()

    if(this.formTransmision.invalid){
      return
    }

    let user = this.oauthService.userSave()
    if(user === null || user === undefined){
      return
    }else{
      
          let transmision : Transmision = {
            title: this.formTransmision.get('title')?.value || '',
            description: this.formTransmision.get('description')?.value || '',
            user: {
              name: user.name,
              email: user.email,
              imgProfile: user.imgProfile
            }
            
          }
          this.transmisionService.createTransmision(transmision)
          this.transmisionSocketService.startTransmisionAudio(transmision.title.toString())

    }


    
  }

}
