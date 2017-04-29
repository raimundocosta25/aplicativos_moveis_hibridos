import { Component, ViewChild, ElementRef, NgZone, OnInit, EventEmitter } from '@angular/core';
import { NavController, Platform, ToastController } from 'ionic-angular';

import { Ponto } from '../../models/ponto';

import { LocalProvider } from "../../providers/local-provider";

import { Geolocation } from '@ionic-native/geolocation';

declare var google;

/*
Generated class for the Login page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  position:any;
  pontos:Ponto;
  emitirRetorno = new EventEmitter<boolean>();

  constructor(public navCtrl: NavController,
    private geolocation: Geolocation,
    platform: Platform,
    public localProvider: LocalProvider,
    public toastCtrl: ToastController,
    public ngZone: NgZone) {

    this.loadMap();

    this.emitirRetorno.subscribe(status => {
      if(status){
        this.inicio();
      }
    });

    this.pontos = new Ponto();

  }

  inicio() {

    this.localProvider.reference.on('value', (snapshot) => {
      this.ngZone.run( () => {
        // let innerArray = new Array();
        snapshot.forEach( elemento => {
          this.pontos = elemento.val();
          // console.log(this.pontos);
          this.addMarker(this.pontos);
          // innerArray.push(el);
        })

      })
    })
  }

  loadMap(){

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.emitirRetorno.emit(true);

    }, (err) => {
      console.log(err);
    });

  }

  addMarker(pos){
    this.localProvider.addPontos(this.map, pos);
  }

}
