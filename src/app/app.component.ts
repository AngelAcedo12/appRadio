import { Component, inject } from '@angular/core';
import { RadioBrowserApi, Station } from 'radio-browser-api';
import { ReproductorServiceService } from './services/reproductor-service.service';
import { start } from 'repl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'appRadio';



  ngOnInit(): void {
    
    setTimeout(() => {

      this.installPWA();
    }, 1000);
  }
  installPWA() {

  


  }
    



}
