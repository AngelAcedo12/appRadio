import { Component } from '@angular/core';

@Component({
  selector: 'app-layaout',
  templateUrl: './layaout.component.html',
  styleUrl: './layaout.component.css'
})
export class LayaoutComponent {


  menuCreateState = false


  changeMenuCreateState(){

    this.menuCreateState = this.menuCreateState ? false : true
  } 
}
