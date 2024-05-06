import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-sncak-bar',
  templateUrl: './error-sncak-bar.component.html',
  styleUrl: './error-sncak-bar.component.css',
  standalone: true
})
export class ErrorSncakBarComponent {


  constructor( @Inject(MAT_SNACK_BAR_DATA) public data: string) {
    console.log(data)
 
  }

}
