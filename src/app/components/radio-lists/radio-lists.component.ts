import { Component, Input } from '@angular/core';
import { Station } from 'radio-browser-api';

@Component({
  selector: 'app-radio-lists',
  templateUrl: './radio-lists.component.html',
  styleUrl: './radio-lists.component.css'
})
export class RadioListsComponent {

  @Input({required:true}) radios : Station[] | undefined 




}
