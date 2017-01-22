import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AngularFire } from 'angularfire2';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';
import { WelcomePage } from '../pages/welcome/welcome';
import { DescentPage } from '../pages/descent/descent';
import { AreasPage } from '../pages/areas/areas';
import { ChurchPage } from '../pages/church/church';
import { AboutMePage } from '../pages/about-me/about-me';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { PremiumPage } from '../pages/premium/premium';
import { LegalPage } from '../pages/legal/legal';
import { FeedbackPage } from '../pages/feedback/feedback';
import { SettingsPage } from '../pages/settings/settings';
import { MainPage } from '../pages/main/main';
import { ExtendedProfilePage } from '../pages/extended-profile/extended-profile';




import { AuthProvider } from '../providers/auth-provider/auth-provider';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import { Keyboard } from 'ionic-native';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  constructor(
    platform: Platform, 
    public af: AngularFire,
    public authProvider:AuthProvider, 
    public storage: Storage) {
    // firebase.initializeApp({
    //   apiKey: "AIzaSyAoSg_zrN3dqxkZNlTwj1MaC4Y-VwfNWUI",
    //   authDomain: "fir-chat-facebook.firebaseapp.com",
    //   databaseURL: "https://fir-chat-facebook.firebaseio.com",
    //   storageBucket: "fir-chat-facebook.appspot.com"
    // })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      StatusBar.backgroundColorByHexString('#ffffff'); // set status bar to white
      Splashscreen.hide();
      if (platform.is('ios')) {
                  Keyboard.hideKeyboardAccessoryBar(false)
                //Keyboard.disableScroll(true);
                //Keyboard.shrinkView(true);
            }
      this.intialize();
    });
  }

  intialize() {
    // this.storage.get('hasUserEnterDetails').then((result) => {
    //     if (result == true) {
    //       this.hasUserEnterDetails = true;
    //     }else {
    //       this.hasUserEnterDetails = false;
    //     }
      //   this.af.auth.subscribe(auth => {
      //   if(auth && this.hasUserEnterDetails == false) {
      //       this.rootPage = WelcomePage;
      //     } else if(auth && this.hasUserEnterDetails == true) {
      //       this.rootPage = TabsPage;
      //     }else{
      //       this.rootPage = LoginPage;
      //     }
      // });
        this.af.auth.subscribe(auth => {
        if(auth) {
            this.rootPage = MainPage;
          }else{
            this.rootPage = LoginPage;
          }
      });
  }
}
