import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {
  @Input() lngLat?: [number, number];
  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit(): void {
    if ( !this.divMap?.nativeElement ) throw "Map Div not found.";
    if ( !this.lngLat ) throw "LngLat can't be null";

    const minimap = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false
    });

    new Marker().setLngLat(this.lngLat).addTo(minimap);
  }
}
