import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-install-app',
  templateUrl: './install-app.component.html',
  styleUrl: './install-app.component.css'
})
export class InstallAppComponent {

  @Input({required:true}) showInstall : boolean = false

  ngOnInit(): void {
    
  }
}
