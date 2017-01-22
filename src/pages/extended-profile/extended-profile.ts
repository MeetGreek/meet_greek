import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ExtendedProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-extended-profile',
  templateUrl: 'extended-profile.html'
})
export class ExtendedProfilePage {
  uid:string;
  interlocutor:string;
  constructor(public navCtrl: NavController, params:NavParams) {
    this.uid = params.data.uid;
    this.interlocutor = params.data.interlocutor;
  }

  ionViewDidLoad() {
  }
  flagUser(): void {
    alert("FLAG USER");
  }
}
