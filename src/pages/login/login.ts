import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { UsuarioProvider } from "../../providers/usuario-provider";

import { CadastroPage } from '../cadastro/cadastro';
import { TabsPage } from '../tabs/tabs';

/*
Generated class for the Lista page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // loader:any;
  user = {email: '', password: ''};

  constructor(public navCtrl: NavController,
              public menuCtrl: MenuController,
              public usuarioPrv: UsuarioProvider) {

  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeEnable(false);
  }

  ionViewDidLoad() {
    this.usuarioPrv.loginSucessoEventEmitter.subscribe(
      user => {
        this.menuCtrl.enable(true);
        this.menuCtrl.swipeEnable(true);
        this.navCtrl.setRoot(TabsPage);
      }
    );
    this.usuarioPrv.loginFalhaEventEmitter.subscribe(
      error => console.log(error)
    )
  }

  login(){
    this.usuarioPrv.loginComCredencial(this.user);
  }

  irCadastro(){
    this.navCtrl.setRoot(CadastroPage);
  }

  // public login() {
  //   this.showLoading()
  //
  //   this.angFire.auth.login(this.user, {
  //     provider: AuthProviders.Password,
  //     method: AuthMethods.Password
  //   }).then((authData) => {
  //     console.log(authData.auth.displayName);
  //     this.loader.dismiss();
  //     this.navCtrl.setRoot(CadastroPage);
  //   }).catch((error) => {
  //     this.showError(error);
  //   });
  // }
  //
  // showLoading() {
  //   this.loader = this.loadingCtrl.create({
  //     content: 'Please wait...'
  //   });
  //   this.loader.present();
  // }
  //
  // showError(text) {
  //   setTimeout(() => {
  //     this.loader.dismiss();
  //   });
  //
  //   let prompt = this.alertCtrl.create({
  //     title: 'Fail',
  //     subTitle: text,
  //     buttons: ['OK']
  //   });
  //   prompt.present();
  // }

}
