import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lbl-country',
  templateUrl: './lbl-country.component.html',
  styleUrl: './lbl-country.component.css'
})
export class LblCountryComponent {

  @Input({required:true}) content : string | undefined
  
}
