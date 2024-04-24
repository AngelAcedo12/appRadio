import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lbl-language',
  templateUrl: './lbl-language.component.html',
  styleUrl: './lbl-language.component.css'
})
export class LblLanguageComponent {

  @Input({required:true}) content : string[] | string | undefined
  
}
