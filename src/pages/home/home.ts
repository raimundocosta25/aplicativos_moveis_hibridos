import { Component, ViewChild, ElementRef, NgZone, OnInit, EventEmitter } from '@angular/core';
import { NavController, Platform, ToastController } from 'ionic-angular';

import { Usuario } from '../../models/usuario';
import { Ponto } from '../../models/ponto';
import { Lista } from '../../models/lista';


import { UsuarioProvider } from '../../providers/usuario-provider';
import { LocalProvider } from '../../providers/local-provider';

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
  // pontos:Ponto;
  usuarios:Array<Usuario>;
  pontos:Array<Ponto>;
  listas:Array<Lista>;
  emitirRetorno = new EventEmitter<boolean>();
  time = new Date();

  constructor(public navCtrl: NavController,
    private geolocation: Geolocation,
    platform: Platform,
    public localPrv: LocalProvider,
    public usuarioPrv: UsuarioProvider,
    public toastCtrl: ToastController,
    public ngZone: NgZone) {

  }

  ionViewWillEnter() {
    this.loadMap();

    this.emitirRetorno.subscribe(status => {
      if(status){
        this.inicio();
      }
    });

  }

  inicio() {

    this.localPrv.getPontos().then(result => {
      this.pontos = result;
      console.log(this.pontos);

      this.usuarioPrv.getUsuarios().then(result => {
        this.usuarios = result;
        console.log(this.usuarios);
        this.listando();

        for(let i=0; i < this.pontos.length; i++){
          if(this.listas[i].ponto.inicio < this.time.getHours() && this.time.getHours() < this.listas[i].ponto.fim){
          this.localPrv.addPontos(this.map, this.listas[i].ponto, this.listas[i].usuarios);
        }
      }
    });
    });
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

  // addMarker(pos){
  //   this.localPrv.addPontos(this.map, pos);
  // }

  listando(){
    console.log(this.usuarios);
    console.log(this.pontos);
    let lista = new Array<Lista>();
    for(let i=0; i < this.pontos.length; i++){
      lista[i] = new Lista();
      lista[i].ponto = new Ponto();
      lista[i].ponto = this.pontos[i];
      for(let j=0; j < this.usuarios.length; j++){
        if(lista[i].ponto.keyReference == this.usuarios[j].pontoKey){
          lista[i].usuarios.push(this.usuarios[j]);
        }
      }
    }
    this.listas = lista;
    console.log(this.listas);
  }

}
