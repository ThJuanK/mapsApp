import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterAloneComponent } from '../../components/counter-alone/counter-alone.component';
import { SideMenuComponent } from '../../components/counter-alone/side-menu/side-menu.component';

@Component({
  standalone: true,
  // imports: [CommonModule],
  imports: [
    CounterAloneComponent,
    SideMenuComponent
  ],
  templateUrl: './alone-page.component.html',
  styleUrls: ['./alone-page.component.css']
})
export class AlonePageComponent {

}