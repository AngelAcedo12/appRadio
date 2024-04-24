import { Component, Input, signal } from '@angular/core';


@Component({
  selector: 'app-lbl-tags',
  templateUrl: './lbl-tags.component.html',
  styleUrl: './lbl-tags.component.css'
})
export class LblTagsComponent {

  @Input({required:true}) content : string[] | undefined
  
  style = signal("limit")


  chageStyle(){
    
  this.style() == 'limit' ? this.style.update(() => 'full') : this.style.update(()=>'limit') 

  }

}
