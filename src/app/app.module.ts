import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { UsersPage } from '../pages/users/users';
import { ChatsPage } from '../pages/chats/chats';
import { AccountPage } from '../pages/account/account';
import { ChatViewPage } from '../pages/chat-view/chat-view';
import { IntroPage } from '../pages/intro/intro';
import { WelcomePage } from '../pages/welcome/welcome';
import { DescentPage } from '../pages/descent/descent';
import { AreasPage } from '../pages/areas/areas';
import { ChurchPage } from '../pages/church/church';
import { AboutMePage } from '../pages/about-me/about-me';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';


import { AuthProvider } from '../providers/auth-provider/auth-provider';
import { ChatsProvider } from '../providers/chats-provider/chats-provider';
import { UserProvider } from '../providers/user-provider/user-provider';
import { UtilProvider } from '../providers/utils';

export const firebaseConfig = {
  apiKey: "AIzaSyCPws3I2YmCW-kGvadQYlgm9JypziF6Z14",
  authDomain: "meetgreek-1783b.firebaseapp.com",
  databaseURL: "https://meetgreek-1783b.firebaseio.com",
  storageBucket: "meetgreek-1783b.appspot.com",
  messagingSenderId: "762176154683"
};

// const myFirebaseAuthConfig = {
//   provider: AuthProviders.Facebook,
//   method: AuthMethods.OAuthToken
// }

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    UsersPage,
    ChatsPage,
    AccountPage,
    ChatViewPage,
    IntroPage,
    WelcomePage,
    DescentPage,
    AreasPage,
    ChurchPage,
    AboutMePage,
    EditProfilePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,
    UsersPage,
    ChatsPage,
    AccountPage,
    ChatViewPage,
    IntroPage,
    WelcomePage,
    DescentPage,
    AreasPage,
    ChurchPage,
    AboutMePage,
    EditProfilePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
  AuthProvider, ChatsProvider, UserProvider, UtilProvider, Storage]
})
export class AppModule {}
