import { Component, OnInit } from '@angular/core';
import { NavController, Platform, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { validateEmail } from '../../validators/email';
import { AuthProvider } from '../../providers/auth-provider/auth-provider';
import { UserProvider } from '../../providers/user-provider/user-provider';
import { UtilProvider } from '../../providers/utils';
import { IntroPage } from '../intro/intro';
import { WelcomePage } from '../welcome/welcome';
import { Facebook } from 'ionic-native';
import firebase from 'firebase';
import { AngularFire } from 'angularfire2';

@Component({
    templateUrl: 'login.html'
})
export class LoginPage {
    hasUserEnterDetails;
    loginForm: any;
    loading : any ;

    constructor(public nav: NavController,
        public af: AngularFire,
        public auth: AuthProvider,
        public userProvider: UserProvider,
        public util: UtilProvider,
        public storage: Storage,
        public platform: Platform,
        public loadingCtrl: LoadingController) {
            this.loading = this.loadingCtrl.create({
                content: 'Authenticating...' 
            });
            
    }

    ionViewDidLoad() {
        this.platform.ready().then(() => {
            this.storage.get('introShown4').then((result) => {
                if (!result) {
                    this.storage.set('introShown4', true);
                    this.nav.setRoot(IntroPage);
                }
            });
            this.storage.get('hasUserEnterDetails').then((result) => {
                if (result == true) {
                    this.hasUserEnterDetails = true;
                }else {
                    this.hasUserEnterDetails = false;
                }
            });
        });   
    }


    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl("", [Validators.required, validateEmail]),
            password: new FormControl("", Validators.required)
        });
        
    }

    signin() {
        this.auth.signin(this.loginForm.value)
            .then((data) => {
                this.storage.set('uid', data.uid);
                this.nav.setRoot(TabsPage);
            }, (error) => {
                let alert = this.util.doAlert("Error", error.message, "Ok");
                alert.present();
            });
    };

    createAccount() {
        let credentials = this.loginForm.value;
        this.auth.createAccount(credentials)
            .then((data) => {
                this.storage.set('uid', data.uid);
                this.userProvider.createUser(credentials, data.uid);
            }, (error) => {
                let alert = this.util.doAlert("Error", error.message, "Ok");
                alert.present();
            });
    };

    facebookLogin() {
        this.loading.present();
        Facebook.login(['email']).then((response) => {
            let facebookCredential = firebase.auth.FacebookAuthProvider
                .credential(response.authResponse.accessToken);

            firebase.auth().signInWithCredential(facebookCredential)
                .then((success) => {
                    this.getProfile();
                })
                .catch((error) => {
                    let alert = this.util.doAlert("Error user", JSON.stringify(error), "Ok");
                    alert.present();
                });
        }, (error) => {
            let alert = this.util.doAlert("Error user", JSON.stringify(error), "Ok");
            alert.present();
            this.loading.dismiss();
        });
        
        
        
        // ).catch((error) => {
        //     let alert = this.util.doAlert("Error user", JSON.stringify(error), "Ok");
        //     alert.present();
        // });
        
    }

    getProfile(): void {
        Facebook.api('/me?fields=id,name,picture.width(500).height(500),email', ['public_profile']).then(
            (response) => {
                this.storage.set('uid', response.id);
                this.storage.set('username', response.name);
                this.storage.set('profile_picture', response.picture);
                this.storage.set('email', response.email);
                // let alert1 = this.util.doAlert("Error respone", this.storage.get('username'), "Ok");
                // alert1.present();

                this.writeUserData(response);

                //THIS CHECK
                var user = firebase.auth().currentUser;
                user.updateProfile({
                    displayName: response.name,
                    photoURL: response.picture.data.url
                }).then(function () {
                    let alert = this.util.doAlert("Error user", user.displayName, "Ok");
                    alert.present();
                }, function (error) {
                    // An error happened.
                });

                // this.menu.enable(true);
                this.loading.dismiss();
                if(this.hasUserEnterDetails == true){
                    this.nav.setRoot(TabsPage);
                }else{
                    this.nav.setRoot(WelcomePage);
                }
                
                // this.nav.setRoot(WelcomePage);

            },

            (err) => {
                console.log(err);
                // let alert = this.doAlert.create({
                //   title: 'Oops!',
                //   subTitle: 'Something went wrong, please try again later.',
                //   buttons: ['Ok']
                // });
                let alert = this.util.doAlert("Error", err.message, "Ok");
                this.loading.dismiss();
                alert.present();
            }
        );
    }

    writeUserData(response): void {
        let userName;
        let userEmail;
        let userProfilePicture;
        let userImages = [];

        this.storage.get('email').then(email => {
            userEmail = email;
        });
        this.storage.get('profile_picture').then(profile_picture => {
            userProfilePicture = profile_picture.data.url;
            userImages.push(profile_picture.data.url);
            this.storage.set('images', userImages);
        });
        this.storage.get('username').then(username => {
            userName = username;
        });
        this.userProvider.getUid().then(uid => {
            let currentUserRef = this.af.database.object(`/users/${uid}`);
            if (currentUserRef) {
                currentUserRef.update({
                    email: userEmail,
                    username: userName,
                    profile_picture: userProfilePicture,
                    images: userImages
                });
            } else {
                currentUserRef.set({
                    email: userEmail,
                    username: userName,
                    profile_picture: userProfilePicture,
                    images: userImages
                });
            }
        });
    }
}