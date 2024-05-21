import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-install-app',
  templateUrl: './install-app.component.html',
  styleUrl: './install-app.component.css'
})
export class InstallAppComponent {

  @Input({required:true}) showInstall : boolean = false
  @Output() closeInstallEvent = new EventEmitter<boolean>()
  ngOnInit(): void {
    
  }
  closeInstall(){
    this.showInstall = false
  }
}
