import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { ListaPage } from '../lista/lista';
import { HomePage } from '../home/home';
import { RotasPage } from '../rotas/rotas';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ListaPage;
  tab3Root = LoginPage;

  constructor(public navCtrl: NavController) {

  }
}
