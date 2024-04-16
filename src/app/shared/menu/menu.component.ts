import { Component } from '@angular/core';
import { MenuItems } from '../../models/MenuItems';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {



  menuItems: MenuItems[] = [
    {title:"All Stations", url:'radio'},
    {title:"Countris",url:''}
  ]
}
