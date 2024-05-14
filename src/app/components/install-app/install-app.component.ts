import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-install-app',
  templateUrl: './install-app.component.html',
  styleUrl: './install-app.component.css'
})
export class InstallAppComponent {

  @Input({required:true}) showInstall : boolean = false

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.showInstall)
  }
}
