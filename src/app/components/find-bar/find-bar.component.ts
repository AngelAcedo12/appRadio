import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-find-bar',
  templateUrl: './find-bar.component.html',
  styleUrl: './find-bar.component.css'
})
export class FindBarComponent {

  @Output() newShearchStation  = new EventEmitter<string>()


  shearch = new FormControl('')

  onSubmit(){
    this.newShearchStation.emit(this.shearch.value || '')
  }



}
