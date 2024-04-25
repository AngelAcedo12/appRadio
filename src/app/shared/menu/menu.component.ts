import { Component, inject } from '@angular/core';
import { MenuItems } from '../../models/MenuItems';
import { OauthService } from '../../services/oauth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {


  public userService = inject(OauthService) 
  private cookiesService = inject(CookieService)
  ngOnInit(): void {
     
     
    


  }

  menuItems: MenuItems[] = [
    {title:"Radios", url:'radio'},
    {title:"Historial",url:''},
    
  ]



}
