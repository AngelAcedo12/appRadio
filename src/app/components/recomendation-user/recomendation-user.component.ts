import { Component, Input } from '@angular/core';
import { RecomendationsServiceService } from '../../services/recomendations-service.service';
import { DtoReocmendation } from '../../models/DTOs/DtoRecomendation';
import { get } from 'http';

@Component({
  selector: 'app-recomendation-user',
  templateUrl: './recomendation-user.component.html',
  styleUrl: './recomendation-user.component.css'
})
export class RecomendationUserComponent {

  @Input({required:true}) actualUser : string | undefined

  constructor(private recomendationService:RecomendationsServiceService) { }

  ngOnInit(): void {
    this.getRecomendations()
  }

  recomendations : DtoReocmendation[] | undefined

  getRecomendations(){

    this.recomendationService.getRandomRecomendations(this.actualUser).subscribe(recomendations=>{
      this.recomendations = recomendations
    })
  
  }

}
