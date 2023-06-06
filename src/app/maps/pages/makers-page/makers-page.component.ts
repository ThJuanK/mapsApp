import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat , Map, Marker, FlyToOptions } from 'mapbox-gl';

interface markerAndColor {
  color: string;
  marker: Marker
}

interface PlainMarker {
  color: string,
  lngLat: number[]
}

@Component({
  selector: 'app-makers-page',
  templateUrl: './makers-page.component.html',
  styleUrls: ['./makers-page.component.css']
})
export class MakersPageComponent {

  @ViewChild('map') divMap?: ElementRef;

  public map?: Map;
  public lngLat: LngLat = new LngLat(-74.20, 4.58)
  public markers: markerAndColor[] = []


  ngAfterViewInit(): void {
    if( !this.divMap ) throw 'Elemento HTML no encontrado'

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 8 , // starting zoom
    });

    this.readFromLocalStorage()

    // const markerHTML = document.createElement('svg')
    // markerHTML.innerHTML = `A`

    // const marker = new Marker( {
    //   color: 'red',
    //   element: markerHTML
    // } )
    // .setLngLat( this.lngLat )
    // .addTo( this.map )

  }



  createMarker(){

    if( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter()

    this.addMarker( lngLat , color )

    this.saveToLocalStorage()

  }


  addMarker( lngLat: LngLat, color: string ){
    if ( !this.map ) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat( lngLat )
      .addTo( this.map )

    this.markers.push( { color, marker } )

    marker.on('dragend', (ev) => {
      this.saveToLocalStorage()
    })

  }

  flyToMarker(marker: Marker){
    this.map?.flyTo( {
       center: marker.getLngLat(),
       zoom: this.map.getZoom() + this.map.getZoom()*.04
      } )
  }

  deleteMarker(i: number){
    this.markers[i].marker.remove()
    this.markers.splice( i, 1 )

    this.saveToLocalStorage()
  }

  saveToLocalStorage(){
    const plainMarkers: PlainMarker[] = this.markers.map( ({color, marker}) => {
      return{
        color: color,
        lngLat: marker.getLngLat().toArray()
      }
    })

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers))
  }

  readFromLocalStorage(){
    const plainMarkers: PlainMarker[] = JSON.parse(localStorage.getItem('plainMarkers') ?? '[]')
    //! cuidado con estos tipados

    plainMarkers.forEach( ({color, lngLat}) =>{
      const [ lng, lat ] = lngLat
      const coords: LngLat = new LngLat( lng, lat )

      this.addMarker( coords, color )
    } )
  }


}
