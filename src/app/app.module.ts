import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ListaPage } from '../pages/lista/lista';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { RotasPage } from '../pages/rotas/rotas';

import { LocalProvider } from '../providers/local-provider';
import { UsuarioProvider } from '../providers/usuario-provider';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDy9SllE8yIFofp7oybNZIGmy1z5f9WbIk",
  authDomain: "appmoveis-effbe.firebaseapp.com",
  databaseURL: "https://appmoveis-effbe.firebaseio.com",
  projectId: "appmoveis-effbe",
  storageBucket: "appmoveis-effbe.appspot.com",
  messagingSenderId: "171169964835"
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    ListaPage,
    LoginPage,
    CadastroPage,
    TabsPage,
    RotasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    ListaPage,
    LoginPage,
    CadastroPage,
    TabsPage,
    RotasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    LocalProvider,
    UsuarioProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  constructor(){
    firebase.initializeApp(firebaseConfig);
  }
}
