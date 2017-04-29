import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { ListaPage } from '../lista/lista';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ListaPage;
  tab2Root = HomePage;
  tab3Root = LoginPage;

  constructor(public navCtrl: NavController) {

  }

  tab1RootF(){
    this.navCtrl.setRoot(ListaPage);
  }
  tab2RootF(){
    this.navCtrl.setRoot(HomePage);
  }
  tab3RootF(){
    this.navCtrl.setRoot(LoginPage);
  }
}
