import { Component, ViewChild } from "@angular/core";
import { Facebook } from 'ionic-native';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { Data } from '../providers/data';
import firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  homePage: any = HomePage;
  aboutPage: any = AboutPage;

  constructor(public platform: Platform, public dataService: Data, public menu: MenuController) {
    firebase.initializeApp({
        apiKey: "AIzaSyCPws3I2YmCW-kGvadQYlgm9JypziF6Z14",
        authDomain: "meetgreek-1783b.firebaseapp.com",
        databaseURL: "https://meetgreek-1783b.firebaseio.com",
        storageBucket: "meetgreek-1783b.appspot.com",
        messagingSenderId: "762176154683"
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // StatusBar.styleDefault();
      // Splashscreen.hide();
    });
  }

  openPage(page): void {

  }

  logout(): void {
    this.menu.close(); 
    this.menu.enable(false); 
    this.nav.setRoot(LoginPage); 
    this.dataService.fbid = null; 
    this.dataService.username = null;
    this.dataService.picture = null; 
    Facebook.logout();
  }
}
