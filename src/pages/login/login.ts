import { Component } from '@angular/core';
import { Platform, NavController, MenuController, AlertController } from 'ionic-angular';
import { Facebook } from 'ionic-native';
import { HomePage } from '../home/home';
import { Data } from '../../providers/data';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public nav: NavController, public platform: Platform, public menu: MenuController, public dataService: Data, public alertCtrl: AlertController) {
    this.menu.enable(false);
  }

  login(): void {
    this.getProfile();
  }

  getProfile(): void {
    this.menu.enable(true)
    this.nav.setRoot(HomePage);
  }

}
