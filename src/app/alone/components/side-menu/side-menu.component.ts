import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MenuItem{
  name: string;
  route: string;
}

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styles: [
  `
  li{
    cursor: pointer;
    transition: 0.2s all;
  }

  maps-side-menu{
    position: fixed;
    top: 10px;
    left: 20px;
    z-index: 999;
    width: 150px;
  }

  `
  ]
})
export class SideMenuComponent {

  public menuItems: MenuItem[] = [
    { route: '/maps/fullscreen', name: 'Full Screen' },
    { route: '/maps/zoom-range', name: 'Zoom Range' },
    { route: '/maps/makers'    , name: 'Makers' },
    { route: '/maps/properties', name: 'Houses' },
    { route: '/alone', name: 'Alone Page' },
  ];

}
