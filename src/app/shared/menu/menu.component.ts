import { Component } from '@angular/core';
import { MenuItems } from '../../models/MenuItems';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  ngOnInit(): void {
    

    
  }

  menuItems: MenuItems[] = [
    {title:"All radios", url:'radio'},
    {title:"History",url:''},
    {title:"Log In",url:''},
    {title:'Sing Up',url:''}
  ]
}
