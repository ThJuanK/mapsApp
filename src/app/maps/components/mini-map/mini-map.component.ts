import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit{

  @Input( ) lngLat?: number[];
  @ViewChild('map') divMap?: ElementRef;

  public map?: Map;


  ngAfterViewInit(){
    if( !this.divMap ) throw 'elemento HTML no encontrado'
    if( !this.lngLat ) return;

    const [lng, lat] = this.lngLat

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: new LngLat( lng, lat ),
      zoom: 13,
      interactive: false
    })

    const marker = new Marker(
      {color: 'red'}
    )
      .setLngLat(this.map.getCenter())
      .addTo(this.map)
  }



}
