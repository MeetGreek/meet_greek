import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the EditProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html'
})
export class EditProfilePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello EditProfilePage Page');
  }

  done(): void {
    
  }
}
