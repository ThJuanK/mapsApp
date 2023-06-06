import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem{
  route: string,
  name: string
}

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [ CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  public menuItems: MenuItem[] = [
    { route: '/maps/fullscreen', name: 'Pantalla Completa'},
    { route: '/maps/makers', name: 'Marcadores'},
    { route: '/maps/properties', name: 'Propiedades'},
    { route: '/maps/zoom', name: 'Zoom'},
  ]

}
