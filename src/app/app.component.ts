import { Component, inject } from '@angular/core';
import { RadioBrowserApi, Station } from 'radio-browser-api';
import { ReproductorServiceService } from './services/reproductor-service.service';
import { start } from 'repl';
import { LocationRadiosService } from './services/location-radios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'appRadio';
  showInstall = false;
  constructor(private locationRadioService: LocationRadiosService) {}
  ngOnInit(): void {
    this.installPWA();
  }

  installPWA() {
    let deferredPrompt: any;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      this.showInstall = true;
    });
    document.getElementById('installButton')?.addEventListener('click', () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
        } else {
        }
        deferredPrompt = null;
      });
    });
    window.addEventListener('appinstalled', () => {
      // Esconder la promoción de instalación de la PWA
      this.showInstall = false;
      // Limpiar el defferedPrompt para que pueda ser eliminado por el recolector de basura
      deferredPrompt = null;
      // De manera opcional, enviar el evento de analíticos para indicar una instalación exitosa
      console.log('PWA was installed');
    });
  }
  closeInstall() {
    this.showInstall = false;
  }
}
