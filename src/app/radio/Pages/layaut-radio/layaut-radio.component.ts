import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layaut-radio',
  templateUrl: './layaut-radio.component.html',
  styleUrl: './layaut-radio.component.css'
})
export class LayautRadioComponent {
  constructor(private route:ActivatedRoute){}

  ngOnInit(): void {
    this.title = this.route.snapshot.params["radio"]
  }

  title:string | undefined
}
