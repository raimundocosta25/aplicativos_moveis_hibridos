import { Injectable, EventEmitter } from '@angular/core';
import { App } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { Ponto } from '../models/ponto';
import { Usuario } from '../models/usuario';
import { Lista } from '../models/lista';

import { ListaPage } from '../pages/lista/lista';

import firebase from 'firebase';

declare var google;

/*
Generated class for the LocalProvider provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocalProvider {

  nav:any;
  reference;
  pontos:Ponto;
  array:Array<number>;
  retornoPontos = new EventEmitter<boolean>();

  constructor(private app: App) {

    this.pontos = new Ponto();
    this.inicialize();

    // this.pontos.lat = -10.190924;
    // this.pontos.lng = -48.312289;
    //
    // this.savePonto(this.pontos);
  }

  inicialize(){

    this.reference = firebase.database().ref('/pontos/');
  }

  savePonto(ponto:Ponto){
    let refKey;
    // update
    if(ponto.keyReference != undefined){
      refKey = ponto.keyReference;
    } else {
      // insert
      refKey = this.reference.push().key;
      ponto.keyReference = refKey;
    }
    this.reference.child(refKey).update(ponto);

  }

  addPontos(map, ponto:Ponto, usuarios:Array<Usuario>){

    let image = {
      url: 'https://image.flaticon.com/icons/png/128/0/622.png',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(20, 32)
    };

    let marker = new google.maps.Marker({
      map: map,
      // animation: google.maps.Animation.DROP,
      title: "Teste",
      position: new google.maps.LatLng(ponto)
      // icon: image
    });

    let content = document.getElementById("teste");

    // let content = document.getElementById('teste');

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(map, marker);
    });

    google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
    });

  }

  getPontos():Promise<Array<Ponto>>{
    return new Promise(resolve => {
      let innerArray = new Array<Ponto>();
      this.reference.on('value', (snapshot) => {
        snapshot.forEach( elemento => {
          let el = elemento.val();
          innerArray.push(el);
        })
        resolve(innerArray);
      })
    });

  }

  addUsuario(ponto:Ponto, usuario:Usuario){
    usuario.pontoKey = ponto.keyReference;
    firebase.database().ref('/usuarios/').child(usuario.keyReference).update(usuario);
  }

}
