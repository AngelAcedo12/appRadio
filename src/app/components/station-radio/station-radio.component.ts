import { Component, Input } from '@angular/core';
import { Station } from 'radio-browser-api';

@Component({
  selector: 'app-station-radio',
  templateUrl: './station-radio.component.html',
  styleUrl: './station-radio.component.css'
})
export class StationRadioComponent {
  @Input({required:true}) station : Station | undefined;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.favicon=this.station!.favicon.length>0 ? this.station?.favicon :  "../../../assets/icons8-radio-50.png"
  
  }
  favicon : String |undefined
}
