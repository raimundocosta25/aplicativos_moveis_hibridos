import { Injectable } from '@angular/core';
import { App } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { Ponto } from '../models/ponto';
import { Usuario } from '../models/usuario';

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

  addPontos(map, position){

    let marker = new google.maps.Marker({
      map: map,
      // animation: google.maps.Animation.DROP,
      title: "Teste",
      position: new google.maps.LatLng(position)
    });

    let content = document.getElementById('teste');

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

  getPontos(){
    let innerArray = new Array<Ponto>();
    this.reference.on('value', (snapshot) => {
        snapshot.forEach( elemento => {
          let el = elemento.val();
          innerArray.push(el);
          // console.log(el);
        })
        // console.log("Entrou");
    })
    return innerArray;
  }

  addUsuario(ponto:Ponto, usuario:Usuario){

    if(usuario.pontoKey == undefined){
      usuario.pontoKey = ponto.keyReference;
      firebase.database().ref('/usuarios/').child(usuario.keyReference).update(usuario);
      ponto.usuarios = new Array<Usuario>();
      let keyRef = ponto.keyReference;
      ponto.usuarios.push(usuario);
      this.reference.child(keyRef).update(ponto);
    }else{
      this.reference.on('value', (snapshot) => {
          snapshot.forEach( elemento => {
            let el = elemento.val();
            if(el.keyReference == usuario.pontoKey){
              var index = el.usuarios.indexOf(usuario);
              el.usuarios.splice(index, 1);
              this.reference.child(el.keyReference).update(el);
            }
          })
          // console.log("Entrou");
      })
    }
  }

}
