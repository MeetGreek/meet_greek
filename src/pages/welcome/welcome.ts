import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
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
  // loading : any ;
  user = {username: "", profile_picture: ""};
  constructor(
    public nav: NavController, 
    public auth: AuthProvider, 
    public userProvider: UserProvider,
    public storage:Storage,
    public loadingCtrl: LoadingController) {
      // this.loading = this.loadingCtrl.create({ 
      //           content: 'Getting user information...' 
      //       });
      // this.loading.present();
      
      
    }

  ngOnInit() {
    // this.userProvider.getUser().then(userObservable => {
    //       userObservable.subscribe(user => {
    //           this.user = user;
    //           
    //           // setTimeout(() => {
    //           //   this.nav.push(DescentPage);
    //           // }, 5000);
    //       });
    //   });
    
  };
  ionViewDidLoad() {
    this.storage.get('username').then(username => {
        this.user.username = username;
      });
      this.storage.get('profile_picture').then(picture => {
        this.user.profile_picture = picture.data.url;
        // this.loading.dismiss();
      });
  }

  goToProfile(): void {
    this.nav.setRoot(DescentPage);
  }

}
