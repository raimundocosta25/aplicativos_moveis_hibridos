import { Component, NgZone} from '@angular/core';
// import {Validators, FormBuilder} from '@angular/forms';
import { NavController, AlertController, ToastController } from 'ionic-angular';

import { Usuario } from '../../models/usuario';
import { Ponto } from '../../models/ponto';

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
  // cadastros: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,
    public usuarioPrv: UsuarioProvider,
    public localPrv: LocalProvider,
    public toastCtrl: ToastController,
    public ngZone: NgZone) {

    }

    ionViewWillEnter() {
      this.pontos = this.localPrv.getPontos();
      console.log(this.usuarioPrv.currentUser);
    }

    registroUser(ponto){
      let user = new Usuario();
      user = this.usuarioPrv.currentUsuario;
      console.log(user);
      this.localPrv.addUsuario(ponto, user);
    }

  }
