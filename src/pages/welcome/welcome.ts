import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth-provider/auth-provider';
import { UserProvider } from '../../providers/user-provider/user-provider';
import { DescentPage } from '../descent/descent';


@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  // user = {username: "", profile_picture: ""};
  loading : any ;
  user = {username: "", profile_picture: ""};
  constructor(
    public nav: NavController, 
    public auth: AuthProvider, 
    public userProvider: UserProvider,
    public storage:Storage,
    public platform: Platform,
    public loadingCtrl: LoadingController) {
      this.loading = this.loadingCtrl.create({ 
                content: 'Getting user information...' 
            });
      this.loading.present();
      this.userProvider.getUser().then(userObservable => {
          userObservable.subscribe(user => {
              this.user = user;
              this.loading.dismiss();
          });
      });
    }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.storage.get('hasUserEnterDetails').then((result) => {
          if (!result) {
              setTimeout(() => {
                this.nav.setRoot(DescentPage);
              }, 8000);
          }
      });
    });
  };
  ionViewDidLoad() {
    
  }
}
