import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor{
  marker: Marker,
  color: string
}

interface PlainMarker{
  color: string;
  lngLat: number[];
}

@Component({
  selector: 'app-makers-page',
  templateUrl: './makers-page.component.html',
  styleUrls: ['./makers-page.component.css' ]
})

export class MakersPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public zoom: number = 13;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat( -99.1517 , 19.5136);

  ngAfterViewInit(): void {
    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.readFromLocalStorage();
    // const marker = new Marker({ color: 'red' })
    //   .setLngLat( this.currentLngLat )
    //   .addTo( this.map );

  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  createMarker(){
    if( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat: LngLat = this.map?.getCenter();

    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string){
    if ( !this.map ) return;

    const marker = new Marker({ color, draggable: true})
    .setLngLat(lngLat)
    .addTo( this.map);

    this.markers.push({ marker, color });
    this.saveToLocalStorage();
    marker.on('dragend', () => {
      this.saveToLocalStorage();
    })
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice( index, 1);
  }

  flyTo(marker: Marker){
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage(){
    const plainMarker: PlainMarker[] =
    this.markers.map(({color, marker}) => {
      return{
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    //console.log( JSON.stringify( plainMarker) );
    localStorage.setItem("plainMarkers", JSON.stringify( plainMarker));
  }

  readFromLocalStorage(){
    const plainMarkerString = localStorage.getItem('plainMarkers') ?? '';
    const plainMarker: PlainMarker[] = JSON.parse(plainMarkerString);
    plainMarker.forEach( ({color, lngLat}) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);
      this.addMarker(coords, color);
    });
  }
}
