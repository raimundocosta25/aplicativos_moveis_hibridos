import { Component, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UsuarioProvider } from '../../providers/usuario-provider';

import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

import { Usuario } from '../../models/usuario';
import { User } from '../../models/user';

import firebase from 'firebase';


@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  user:User;
  usuario:Usuario;

  constructor(public navParams: NavParams,
    public navCtrl: NavController,
    public usuarioPrv: UsuarioProvider) {

      this.user = new User();
      this.usuario = new Usuario();

      // this.loginSuccess.subscribe(status => {
      //   if(status){
      //     this.registroUsuario();
      //   }
      // });
    }

  ionViewDidLoad() {

  }

  registroUser(){
    this.usuarioPrv.registrarUser(this.user);
    // this.registroSuccess.emit(true);
    this.usuarioPrv.registroSuccess.subscribe(status => {
      if(status){
        this.usuarioPrv.loginComCredencial(this.user);
        // this.loginSuccess.emit(true);
        this.registroUsuario();
      }
    });
    // this.navCtrl.setRoot(SubcadastroPage);
    // this.navCtrl.setRoot(LoginPage);
  }

  registroUsuario(){
    // console.log(firebase.auth().currentUser);
    this.usuarioPrv.loginSuccess.subscribe(status => {
      if(status){
        this.usuario.uid = this.usuarioPrv.uid;
        this.usuarioPrv.registrarUsuario(this.usuario);
        this.navCtrl.setRoot(TabsPage);
      }
    });
  }

  irLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

}
