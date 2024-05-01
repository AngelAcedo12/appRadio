import { Component, computed, inject } from '@angular/core';
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
  contexState = false
  menuLaterState = false
  menuItems: MenuItems[] = [
    {title:"Radios", url:'radio'},
    {title:"Historial",url:'radio/history'},
    
  ]

  closedSesion(){
    this.cookiesService.delete("oauth-token-app-radio")
    this.userService.userSave= computed(() => undefined)
    this.userService.logInState.update(() => false)
  }

  openMenu(){
    
    if(this.menuLaterState){
      document.getElementById("menu-later")?.classList.replace("close", "open")

      this.menuLaterState = false
      const bodyElement = document.getElementsByTagName("html");
      if (bodyElement) {
        bodyElement[0].style.overflowY = "hidden";
      }
    }
    else{
      const bodyElement = document.getElementsByTagName("html");
      if (bodyElement) {
        bodyElement[0].style.overflowY = "auto";
      }
      document.getElementById("menu-later")?.classList.replace("open", "close")
      this.menuLaterState = true
    }
   
  }
  openContex() {
      if(this.contexState==false){
        document.getElementById("contex")?.classList.replace("closeContex", "openContex")
        this.contexState = true
      }else{
        document.getElementById("contex")?.classList.replace("openContex", "closeContex")
        this.contexState = false
      }
  
  }
  
}
