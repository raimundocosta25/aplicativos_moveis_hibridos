import { Injectable, EventEmitter, NgZone } from '@angular/core';

import { LoadingController, AlertController, App } from 'ionic-angular';

import firebase from 'firebase';

import { Usuario } from '../models/usuario';
import { User } from '../models/user';

import { CadastroPage } from '../pages/cadastro/cadastro';
import { TabsPage } from '../pages/tabs/tabs';

/*
Generated class for the UsuarioProvider provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UsuarioProvider {

  loginSucessoEventEmitter:EventEmitter<any>;
  loginFalhaEventEmitter:EventEmitter<any>;
  loginSuccess = new EventEmitter<boolean>();
  logoutEventEmitter:EventEmitter<any>;
  registroSuccess = new EventEmitter<boolean>();
  loader:any;

  getSuccess = new EventEmitter<boolean>();
  nav:any;
  uid:any;
  usuarios:Array<Usuario>;
  currentUser:any;
  autenticado:boolean;
  currentUsuario:Usuario;
  reference;

  constructor(private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public ngZone: NgZone,
    private app: App) {

      this.loginSucessoEventEmitter = new EventEmitter();
      this.loginFalhaEventEmitter = new EventEmitter();
      this.logoutEventEmitter = new EventEmitter();

      this.nav = app.getActiveNav();
      this.inicialize();
      this.currentUsuario = new Usuario();
      this.usuarios = new Array();
      this.getUsuarios();

      firebase.auth().onAuthStateChanged(usuario => {
        this.callbackStateChange(usuario);
      })

      console.log(this.currentUsuario);

    }

    inicialize(){
      this.reference = firebase.database().ref('/usuarios/');
    }

    private callbackStateChange(usuario){
      this.ngZone.run( () => {
        if(usuario == null){
          this.currentUser = null;
          this.autenticado = false;
        } else {
          this.currentUser = usuario;
          this.autenticado = true;
          this.getCurrent();
        }
      })
    }

    registrarUsuario(usuario:Usuario){
      let refKey;
      // update
      if(usuario.keyReference != undefined){
        refKey = usuario.keyReference;
      } else {
        // insert
        refKey = this.reference.push().key;
        usuario.keyReference = refKey;
      }

      usuario.uid =  firebase.auth().currentUser.uid;
      this.reference.child(refKey).update(usuario);
      // this.nav.setRoot(TabsPage);

    }

    registrarUser(user:User){

      this.showLoading()

      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(result => {
        setTimeout(() => {
          this.loader.dismiss();
        });

        let prompt = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'Your new Account was created!',
          buttons: ['OK']
        });
        prompt.present();
        // this.loginComCredencial(user);
        // this.nav.setRoot(CadastroPage);
        this.registroSuccess.emit(true);
      })
      .catch(error => this.showError(error));
    }

    getCurrent() {
      this.uid = this.currentUser.uid;
      let user = new Usuario();
      this.reference.on('value', (snapshot) => {
        let usuario = new Usuario();
        snapshot.forEach( elemento => {
          usuario = elemento.val();
          if(usuario.uid == this.uid){
            this.currentUsuario = usuario;
            this.getSuccess.emit(true);
          }
          // console.log(this.pontos);
        })
      })
    }

    getUsuarios():Promise<Array<Usuario>>{
      return new Promise(resolve => {
        let innerArray = new Array<Usuario>();
        this.reference.on('value', (snapshot) => {
          snapshot.forEach( elemento => {
            let el = elemento.val();
            innerArray.push(el);
          })
          resolve(innerArray);
        })
      });
    }

    showLoading() {
      this.loader = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loader.present();
    }

    showError(text) {
      setTimeout(() => {
        this.loader.dismiss();
      });

      let prompt = this.alertCtrl.create({
        title: 'Fail',
        subTitle: text,
        buttons: ['OK']
      });
      prompt.present();
    }

    sair(){
      firebase.auth().signOut()
      .then(() => this.logoutEventEmitter.emit(true))
      .catch(error => this.callbackFalhaLogin(error))
    }

    loginComCredencial(user:User){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(resultado => this.loginSuccess.emit(true))
      .catch(error => this.callbackFalhaLogin(error))
    }

    loginComFacebook(){
      //noinspection TypeScriptUnresolvedFunction
      let provider = new firebase.auth.FacebookAuthProvider();

      return firebase.auth().signInWithPopup(provider)
      .then(resultado => this.callbackSucessoLogin(resultado))
      .catch(error => this.callbackFalhaLogin(error))
    }

    loginComGoogle(){
      //noinspection TypeScriptUnresolvedFunction
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then(resultado => this.callbackSucessoLogin(resultado))
      .catch(error => this.callbackFalhaLogin(error))
    }

    private callbackSucessoLogin(response){
      this.loginSucessoEventEmitter.emit(response.user);
      // this.nav.setRoot(CadastroPage);
    }

    private callbackFalhaLogin(error){
      this.loginFalhaEventEmitter.emit({code : error.code, message : error.message, email: error.email, credencial: error.credencial});
    }

  }
