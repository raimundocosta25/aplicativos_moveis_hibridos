import { Component, NgZone, EventEmitter, OnInit } from '@angular/core';
// import {Validators, FormBuilder} from '@angular/forms';
import { NavController, AlertController, ToastController } from 'ionic-angular';

import { Usuario } from '../../models/usuario';
import { Ponto } from '../../models/ponto';
import { Lista } from '../../models/lista';


import { UsuarioProvider } from '../../providers/usuario-provider';
import { LocalProvider } from '../../providers/local-provider';

/*
Generated class for the Cadastro page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html'
})
export class ListaPage {
  usuarios:Array<Usuario>;
  pontos:Array<Ponto>;
  listas:Array<Lista>;
  retorno = new EventEmitter<boolean>();
  // cadastros: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,
    public usuarioPrv: UsuarioProvider,
    public localPrv: LocalProvider,
    public toastCtrl: ToastController,
    public ngZone: NgZone,
    public alertCtrl: AlertController) {

    }

    ionViewWillEnter() {
      this.localPrv.getPontos().then(result => {
        this.pontos = result;
        console.log(this.pontos);
      });

      this.usuarioPrv.getUsuarios().then(result => {
        this.usuarios = result;
        console.log(this.usuarios);
        this.listando();
        this.retorno.emit(true);
        console.log(this.listas);
    });
    // this.retorno.subscribe(status => {
    //   if(status){
    //     this.listando();
    //   }
    // });
    }




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

    // this.pontos = this.localPrv.getPontos();
    // console.log(this.usuarioPrv.currentUser);

    registroUser(ponto){
      let user = new Usuario();
      user = this.usuarioPrv.currentUsuario;
      this.localPrv.addUsuario(ponto, user);
    }

  }
