import { ActivatedRoute } from '@angular/router';
import { OauthService } from '../../../services/oauth.service';
import { UserService } from './../../../services/user.service';
import { Component } from '@angular/core';
import { DtoProfile } from '../../../models/DTOs/DtoProfile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {


  constructor(private userSevice : UserService, public oauthService:OauthService, private activeRoute:ActivatedRoute) { }
  
  ngOnInit(): void {
    let queryName =this.activeRoute.snapshot.params["name"];
    console.log(queryName)
    if(queryName!=null){
      console.log("queryName",queryName)
      console.log("Cogiendo perfil con nombre")
      this.userSevice.getProfileWithName(queryName)
    }else{
      console.log("Cogiendo perfil con token")
      this,this.userSevice.getProfileWithToken()
      
    }
    

  }

  name : string | null = null;
  
}
