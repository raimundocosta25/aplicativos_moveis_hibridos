import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LocalProvider } from '../../providers/local-provider';

import { Ponto } from '../../models/ponto';

/**
 * Generated class for the Rotas page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-rotas',
  templateUrl: 'rotas.html',
})
export class RotasPage {
  ponto:Ponto;

  constructor(public navCtrl: NavController, public navParams: NavParams, public localPrv: LocalProvider) {
    this.ponto = new Ponto();
  }

  ionViewDidLoad() {}

  registrarPonto(){
    this.ponto.lat = +this.ponto.lat;
    this.ponto.lng = +this.ponto.lng;
    this.localPrv.savePonto(this.ponto);
  }

}
