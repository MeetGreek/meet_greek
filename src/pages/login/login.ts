import { Component } from '@angular/core';
import { Platform, NavController, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { Facebook } from 'ionic-native';
import { HomePage } from '../home/home';
import { Data } from '../../providers/data';
import { IntroPage } from '../intro/intro';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loading: any;

  constructor(public nav: NavController, public platform: Platform, public menu: MenuController, public dataService: Data, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public storage: Storage) {

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.menu.enable(false);
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.storage.get('introShown4').then((result) => {
        if(!result){
          this.storage.set('introShown4', true);
          this.nav.setRoot(IntroPage);
        }
      });
    });
  }
  
  login(): void {

        this.loading.present();

        Facebook.login(['email']).then((response) => {
          let facebookCredential = firebase.auth.FacebookAuthProvider
            .credential(response.authResponse.accessToken);

          firebase.auth().signInWithCredential(facebookCredential)
            .then((success) => {
              this.getProfile();
            })
            .catch((error) => {
              console.log("Firebase failure: " + JSON.stringify(error));
            });


        }, (err) => {

          let alert = this.alertCtrl.create({
            title: 'Oops!',
            subTitle: 'Something went wrong, please try again later.',
            buttons: ['Ok']
          });

          this.loading.dismiss();
          alert.present();

        });

      }

  getProfile(): void {
        Facebook.api('/me?fields=id,name,picture', ['public_profile']).then(
          (response) => {
            console.log(response);

            this.dataService.fbid = response.id;
            this.dataService.username = response.name;
            this.dataService.picture = response.picture.data.url;

            var user = firebase.auth().currentUser;
            user.updateProfile({
              displayName: this.dataService.username,
              photoURL: this.dataService.picture
            }).then(function () {
              // Update successful.
            }, function (error) {
              // An error happened.
            });
            this.writeUserData();
            this.menu.enable(true);
            this.loading.dismiss();
            this.nav.setRoot(HomePage);

          },

          (err) => {

            console.log(err);

            let alert = this.alertCtrl.create({
              title: 'Oops!',
              subTitle: 'Something went wrong, please try again later.',
              buttons: ['Ok']
            });

            this.loading.dismiss();
            alert.present();

          }

        );

      }

  writeUserData(): void {
        firebase.database().ref('users/' + this.dataService.fbid).set({
          username: this.dataService.username,
          profile_picture: this.dataService.picture
        });
      }

}