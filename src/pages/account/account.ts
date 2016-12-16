import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth-provider/auth-provider';
import { UserProvider } from '../../providers/user-provider/user-provider';
import { Facebook } from 'ionic-native';
import { UtilProvider } from '../../providers/utils';
import { EditProfilePage } from '../edit-profile/edit-profile';

import { LoginPage } from '../login/login';

@Component({
    templateUrl: 'account.html'
})
export class AccountPage {
    profilePage;
    rootNav;
    user = {username: "", profile_picture: "", aboutMe: "", descent: "", areas: [], church: "", education: "", location: ""};
    constructor(
        public nav: NavController, 
        public auth: AuthProvider, 
        public userProvider: UserProvider,
        public local:Storage,
        public util: UtilProvider) {
        this.userProvider.getUser().then(userObservable => {
            userObservable.subscribe(user => {
                this.user = user;
            });
        });
        this.profilePage = 'profile';
    }
    
    //save user info
    updatePicture(): void {
        // this.userProvider.updatePicture();
        let alert = this.util.doAlert("Error", this.user.username, "Ok");
        alert.present();

    };

    edit(): void {
        this.nav.push(EditProfilePage);
    }

    next(): void {

    }

    logout(): void {
        this.local.remove('uid');
        this.local.remove('username');
        this.local.remove('profile_picture');
        this.local.remove('email');
        this.nav.setRoot(LoginPage);
        this.local.remove('userInfo');
        Facebook.logout();
        this.auth.logout();
    }
}