// import { Component, OnInit, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, ModalController, Slides, Content } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { UserProvider } from '../../providers/user-provider/user-provider';
import { LikeProvider } from '../../providers/like-provider/like-provider';
import { ChatViewPage } from '../chat-view/chat-view';
import { Storage } from '@ionic/storage';
import { SettingsPage } from '../settings/settings';
// import { UserSettingsPage } from '../user-settings/user-settings';
import { ExtendedProfilePage } from '../extended-profile/extended-profile';
import { ChatMatchPage }  from '../chat-match/chat-match';
import { ConvertDistance } from '../../pipes/convert-distance'
import { ViewChild } from '@angular/core';
import { MatchPage } from '../match/match';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
  // animations: [
  //   trigger('fade', [
  //     state('visible', style({
  //       opacity: 1
  //     })),
  //     state('invisible', style({
  //       opacity: 0
  //     })),
  //     transition('visible <=> invisible', animate('500ms linear'))
  //   ]),
 
  //   trigger('bounce', [
  //     state('bouncing', style({
  //       transform: 'translate3d(0,0,0)'
  //     })),
  //     transition('* => bouncing', [
  //       animate('300ms ease-in', keyframes([
  //         style({transform: 'translate3d(0,0,0)', offset: 0}),
  //         style({transform: 'translate3d(0,-30px,0)', offset: 0.5}),
  //         style({transform: 'translate3d(0,0,0)', offset: 1}) 
  //       ]))
  //     ])
  //   ])
  // ]
})
export class MainPage {
  isLiked = false;
  everythingLoaded = false;
  everythingLoaded2 = false;
  likeKeys = [];
  @ViewChild('mainSlider') mainSlider: Slides;
  @ViewChild(Content) content: Content;
  currentInterlocutorKey: any;
  currentInterlocutorKey2: any;
  isPublicEnabled = false;
  calculatedDistance = 0;
  buttonDisabled: any;
  // fadeState: String = 'visible';
  // bounceState: String = 'noBounce';
  
  loggedUser = <any>{};
  uid:string;
  slideOptions: any; 
  public slider: any;
  userActive;
  sliderEnded = false;
  premium = true;
  greeksFound = true;
  interlocutorLikes:Observable<any[]>;
  userLikes:Observable<any[]>;
  userkeys = [];
  users:Observable<any[]>;
  // buttonsVisible = false;
  constructor(
    public navCtrl: NavController,
     public userProvider: UserProvider,
     public modalCtrl: ModalController,
     public storage: Storage,
     public likeProvider: LikeProvider
     ) {
    // setTimeout(() => { // <=== 
      
    //   // this.toggleBounce();
    //   // this.toggleFade();
    // },2000);

    // this.slideOptions = {
    //   onlyExternal: false,
    //   onInit: (slides: any) =>
    //     this.slider = slides
    // }
    this.storage.set('hasUserReachedMain', true);
    this.buttonDisabled = null;
  }

  ionViewDidLoad() {
    this.userProvider.getUid()
    .then(uid => {
        this.uid = uid;
        this.users = this.userProvider.getAllUsers();
        this.userLikes = this.likeProvider.getUserLikes(uid);
        this.addToLikedArray();
        // this.buttonsVisible = true;
        //this.getCurrentInterloculot(this.mainSlider.getActiveIndex());
    });
    // this.storage.get('hasUserEnterDetails').then((result) => {
    //     if (!result) {
    //       this.buttonsVisible = false;
    //     } else {
    //       this.buttonsVisible = true;
    //     }
    //   });
    this.userProvider.getUser().then(userObservable => {
      userObservable.subscribe(data => {
        this.loggedUser = data;
      });
      //console.log(this.loggedUser.likes);
    });

    this.storage.get('discoverable').then(result => {
      if (!result) {
          this.isPublicEnabled = false;
        } else {
          this.isPublicEnabled = true;
        }
    });
    //this.slider.lockSwipeToPrev();
    // if(this.users){
    //   this.greeksFound = false;
    // }else{
    //   this.greeksFound = true;
    //   //this.userActive = this.users[this.indexOfArr];
    // }
  }

  ionViewDidEnter() {

   // this.slider.lockSwipeToPrev();
    
  }

  f(event) 
  { console.log(event);}
    
    openChat(key) {
        let param = {uid: this.uid, interlocutor: key};
        this.navCtrl.push(ChatViewPage,param);
    }

  //   swipeEvent(event): void {
  //     if (event.direction == 2) {
  //       // this.slider.lockSwipeToPrev();
  //       // if(this.slider.isEnd){
  //       //   this.sliderEnded = true;
  //       //   //this.greeksFound = false;
  //       // }
  //   }
  //   if (event.direction == 4) {
  //       // this.slider.lockSwipeToPrev();
  //       // this.reject();
  //   }
  // }

  ionSlideTap(key) {
    this.buttonDisabled = true;
    // alert("Go To Extended Profile");
    let param = null;
    param = {uid: this.uid, interlocutor: key};   
    //let param = {uid: "this uid", interlocutor: "other user key"};
    let extendedProfileModal = this.modalCtrl.create(ExtendedProfilePage, param);
      extendedProfileModal.onDidDismiss(data => {
        if(data.foo == 'bar1'){
          //this.goToNextUser();
        }
        this.buttonDisabled = null;
      });
    extendedProfileModal.present();
    //this.navCtrl.push(ExtendedProfilePage, );
  }
  ionSlideNextEnd(): void {
    alert("user liked this one");
  }
  goToChat(): void {
    this.navCtrl.push(ChatMatchPage);
  }

  goToSettings(): void {
    this.navCtrl.setRoot(SettingsPage);
  }

  // goToUserSettings(): void {
  //   this.navCtrl.setRoot(UserSettingsPage);
  // }

  redo(): void {
    if(this.premium){
      // if(!this.slider.isBeginning){
      //   this.slider.unlockSwipeToPrev();
      //   this.slider.slidePrev();
      //   this.slider.lockSwipeToPrev();
      // }else{
      //   this.slider.lockSwipeToPrev();
      // }
      
    }else{
      alert('Load Premium Page');
    }
    // if(this.premium){
    //   alert('user has bought premium - REDO');
    //   if(this.indexOfArr-1 >= 0){
    //     this.userActive = this.users[this.indexOfArr - 1];
    //     this.indexOfArr -= 1;
    //   }else {
    //     alert("You have reached the first found user");
    //   }
    // }else{
    //   alert('user cant use that function');
    // }
  }

  superLike(): void {
   let uid =this.uid;
    let interlocutor = this.currentInterlocutorKey;
    this.likeProvider.addSuperLike(uid, interlocutor);
    this.likeKeys.push(interlocutor);
    var index = this.userkeys.indexOf(interlocutor);
    if (index > -1) {
      this.userkeys.splice(index, 1);
    }  
    //this.checkLikes();
     
  }

  checkLikes(): void {
    if(this.likeKeys.indexOf(this.currentInterlocutorKey) == -1){
          this.isLiked = false
        }else{
          this.isLiked = true;
        }
    console.log(this.currentInterlocutorKey);
    console.log(this.isLiked);
    this.mainSlider.update();
  }

  reject(interlocutor): void {
    let uid =this.uid;
    // let interlocutor = this.currentInterlocutorKey;
    this.likeProvider.reject(uid, interlocutor);
    this.likeKeys.push(interlocutor);
    // var index = this.userkeys.indexOf(interlocutor);
    // if (index > -1) {
    //   this.userkeys.splice(index, 1);
    // }
    //this.checkLikes();
    this.mainSlider.update();
    this.mainSlider.slideNext();

    //reload users
    this.everythingLoaded = false;
    this.userProvider.getUid()
      .then(uid => {
          this.uid = uid;
          this.users = this.userProvider.getAllUsers();
          this.userLikes = this.likeProvider.getUserLikes(uid);
          this.addToExistingLikedArray(interlocutor);
          // this.buttonsVisible = true;
      });
    //console.log(this.userkeys);
    
  }

  addToLikedArray(): void {
    this.userLikes.subscribe(likes => {
        this.likeKeys = [];
        // items is an array
        likes.forEach(like => {
          //console.log(item.$key);
            this.likeKeys.push(like.$key);
            // var index = this.userkeys.indexOf(like.$key, 0);
            // console.log(index);
            // if (index > -1) {
            //   this.userkeys.splice(index, 1);
            // }  
        });
        // this.mainSlider.update();
        this.everythingLoaded = true;
        this.update();
        //this.ionViewDidLoad();
        //this.checkLikes();
        // console.log(this.currentInterlocutorKey);
        //
    });
  }


  addToExistingLikedArray(interlocutor): void {
        this.likeKeys.push(interlocutor);
        console.log(this.likeKeys);
        this.everythingLoaded = true;  
  }

  slideChanged() {
    
    // this.users.forEach(user => {
    //   //console.log(user);
    // });
   
    // for (let key in this.users) {
    //     console.log(key);
    //     userkeys.push(key);
    //   }
    // console.log(userkeys);
    


    // let currentIndex = this.mainSlider.getActiveIndex();
    // this.getCurrentInterloculot(currentIndex);
    // this.mainSlider.update();
    //console.log("Current index is", currentIndex);
    // var obj = this.users;
    // this.currentInterlocutorKey = obj[Object.keys(obj)[currentIndex]];
    // //alert(this.currentInterlocutorKey);
    // var keys = Object.keys(this.users);
    // console.log(keys);
  }

  getCurrentInterloculot(index): void {
    
    this.users.subscribe(items => {
      if(this.everythingLoaded2 != true){
        this.userkeys = [];
        // items is an array
        items.forEach(item => {
          //console.log(item.$key);
          if(item.$key != this.uid){
            this.userkeys.push(item.$key);
          }
        });
        // console.log(userkeys);
          this.addToLikedArray();
        }
        this.everythingLoaded2 = true;
        //this.checkLikes();
        this.currentInterlocutorKey = this.userkeys[index];
        console.log(this.currentInterlocutorKey);
        console.log(this.userkeys);
    });
  }

  like(interlocutor): void {
    // this.goToNextUser();
    
    let uid =this.uid;
    // let interlocutor = this.currentInterlocutorKey;
    this.likeProvider.addLike(uid, interlocutor);
    this.update();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    // this.likeKeys.push(interlocutor);
    // var index = this.userkeys.indexOf(interlocutor);
    // if (index > -1) {
    //   this.userkeys.splice(index, 1);
    // }
    //this.checkLikes();
    // this.mainSlider.update();

    //reload users
    this.everythingLoaded = false;
    this.userLikes = null;
    this.userkeys = null;
    this.users = null;
    this.userProvider.getUid()
      .then(uid => {
          this.uid = uid;
          this.users = this.userProvider.getAllUsers();
          this.userLikes = this.likeProvider.getUserLikes(uid);
          this.addToLikedArray();
          // this.buttonsVisible = true;
      });
      this.interlocutorLikes = this.likeProvider.getUserLikes(interlocutor);
        this.interlocutorLikes.subscribe(likes => {
          // items is an array
          likes.forEach(chat => {
            //console.log(item.$key);
            if(chat.$key == this.uid){
              this.match(interlocutor);
            }
          });
      });
    //console.log(this.userkeys);
  }

  update(){
    this.content.resize();
  }

  match(other_key): void {
    let param = null;
    param = {interlocutor: other_key};
    //let param = {uid: "this uid", interlocutor: "other user key"};
    let matchModal = this.modalCtrl.create(MatchPage, param);
      // matchModal.onDidDismiss(data => {
      //   if(data.foo == 'bar1'){
      //     this.goToNextUser();
      //   }
      //   this.buttonDisabled = null;
      // });
    matchModal.present();
  }

  goToNextUser(): void {
    // this.slider.lockSwipeToPrev();
    // // if(this.indexOfArr+1 < this.users.length){
    // //   this.userActive = this.users[this.indexOfArr + 1];
    // //   this.indexOfArr += 1;

    // // }else{
    // //   this.greeksFound = false;
    // // }
    // if(this.slider.isEnd){
    //   this.sliderEnded = true;
    //   this.greeksFound = false;
    // }else{
    //   this.slider.slideNext();
    // }
    // alert('Load next user');
  }

  toggleFade() {
    // this.fadeState = 'visible';    
  }
 
  toggleBounce(){
    // this.bounceState =  'bouncing';   
  }

}
