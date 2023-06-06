import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public lngLat: LngLat = new LngLat(-74.5, 40)

  ngAfterViewInit(): void {
    if( !this.divMap ) throw 'Elemento HTML no encontrado'

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom , // starting zoom
    });

    this.mapListeners()
  }

  ngOnDestroy(): void {
    this.map?.remove()
  }

  mapListeners(){
    if( !this.map ) throw 'mapa no inicializado'

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    })

    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() < 18) return

      this.map!.zoomTo(18)
    })

    this.map.on('move', (ev) =>{
      this.lngLat = this.map!.getCenter();
      console.log(this.lngLat)
    })
  }

  zoomIn(){
    this.map?.zoomIn()
  }

  zoomOut(){
    this.map?.zoomOut()
  }

  zoomChanged(zoom: string){
    this.zoom = Number(zoom)
    this.map?.setZoom(this.zoom)
  }


}
