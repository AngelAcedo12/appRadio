import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, signal, SimpleChanges } from '@angular/core';
import { MenuItems } from '../../models/MenuItems';

@Component({
  selector: 'app-opcion-menu',
  templateUrl: `./opcionMenu.components.html`,
  styleUrl: './opcionMenu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpcionMenuComponent {
 

  @Input({required: true}) stateMenu : boolean = false;
  @Output() stateMenuOpcion = new EventEmitter();
 
  menuItems : MenuItems[]= [
    {
      title: "Cambiar contraseña",
      url: "/profile/changePassword",

    },
  ]


  
  closeOpcionMenu(){
    this.stateMenuOpcion.emit()
  }




}
