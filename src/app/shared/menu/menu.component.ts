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


  private userService = inject(OauthService) 
  private cookiesService = inject(CookieService)
  ngOnInit(): void {
      console.log(this.cookiesService.getAll())
      const token = this.cookiesService.get("oauth-token-app-radio")
      console.log(token)
      if(this.userService.logInState()===false || token.length<=0 || token != null || token != undefined){
        this.userService.logInWhitToken(token)
      }else{
        window.location.href = "oauth/logIn"
      }

  }

  menuItems: MenuItems[] = [
    {title:"Radios", url:'radio'},
    {title:"Historial",url:''},
    
  ]
}
