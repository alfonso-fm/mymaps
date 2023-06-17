import { Component } from '@angular/core';

interface MenuItem{
  name: string;
  route: string;
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styles: [
  `
  li{
    cursor: pointer;
    transition: 0.2s all;
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
  ];

}
