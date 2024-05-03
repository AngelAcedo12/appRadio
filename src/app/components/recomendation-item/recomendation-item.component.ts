import { Component, Input } from '@angular/core';
import { DtoReocmendation } from '../../models/DTOs/DtoRecomendation';

@Component({
  selector: 'app-recomendation-item',
  templateUrl: './recomendation-item.component.html',
  styleUrl: './recomendation-item.component.css'
})
export class RecomendationItemComponent {


  @Input() recomendation : DtoReocmendation | undefined




}
