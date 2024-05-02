import { ActivatedRoute } from '@angular/router';
import { OauthService } from '../../../services/oauth.service';
import { UserService } from './../../../services/user.service';
import { Component, signal } from '@angular/core';
import { DtoProfile } from '../../../models/DTOs/DtoProfile';
import { HistoryService } from '../../../services/history.service';
import { Station } from 'radio-browser-api';
import { historyItem } from '../../../models/DTOs/DtoHistory';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {


  constructor(public userSevice : UserService, public oauthService:OauthService, private activeRoute:ActivatedRoute, public historyService: HistoryService) { }




  ngOnInit(): void {
    let queryName =this.activeRoute.snapshot.params["name"];
    console.log(queryName)
    if(queryName!=null){
      console.log("queryName",queryName)
      console.log("Cogiendo perfil con nombre")
      this.userSevice.getProfileWithName(queryName)

    }else{
      console.log("Cogiendo perfil con token")
      this.userSevice.getProfileWithToken()
      this.historyService.getHistory()
      
    }
    

  }

  name : string | null = null;
  stateMenuOpcion = signal(false)


  getHystory() : historyItem[] | undefined{
    let history = this.userSevice.profile()?.history.reverse()
    history= history?.slice(0,5)
  
    return history;
  
  }

  getProfileImg(){

    return this.userSevice.profile()?.imgProfile == null ?  "../../../../assets/profile/avatar.webp" : this.userSevice.profile()?.imgProfile+".webp";
  }
  changeStateMenuOpcion(){
    if(this.stateMenuOpcion()){
      this.stateMenuOpcion.update(()=>false)

    }else{
      this.stateMenuOpcion.update(()=>true)
    }
  }


}
