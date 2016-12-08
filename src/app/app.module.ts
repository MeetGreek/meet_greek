import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { IntroPage } from '../pages/intro/intro';
import { Data } from '../providers/data';
import { Storage } from '@ionic/storage' ;
import firebase from 'firebase';

@NgModule({
  declarations: [
    MyApp,
    IntroPage,
    HomePage,
    LoginPage,
    AboutPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IntroPage,
    HomePage,
    LoginPage,
    AboutPage
  ],
  providers: [Data, Storage]
})
export class AppModule {}
