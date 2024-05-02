import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-opcion-menu',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: `./opcionMenu.components.html`,
  styleUrl: './opcionMenu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpcionMenuComponent { }
