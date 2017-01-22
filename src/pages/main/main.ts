import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { UserProvider } from '../../providers/user-provider/user-provider';
import { ChatViewPage } from '../chat-view/chat-view';
import { Storage } from '@ionic/storage';
import { SettingsPage } from '../settings/settings';
import { ExtendedProfilePage } from '../extended-profile/extended-profile';

import { Filter } from '../../pipes/filter';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
  users:Observable<any[]>;
  uid:string;
  slideOptions: any; 
  public slider: any;
  userActive;
  sliderEnded = false;
  premium = true;
  greeksFound = true;
  constructor(public navCtrl: NavController, public userProvider: UserProvider) {
    this.slideOptions = { 
      onlyExternal: false,
      onInit: (slides: any) =>
        this.slider = slides
    }
  }

  ionViewDidLoad() {
    this.slider.lockSwipeToPrev();
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

  ngOnInit() {
    this.userProvider.getUid()
    .then(uid => {
        this.uid = uid;
        this.users = this.userProvider.getAllUsers();
    });
  };
    
    openChat(key) {
        let param = {uid: this.uid, interlocutor: key};
        this.navCtrl.push(ChatViewPage,param);
    }

    swipeEvent(event): void {
      if (event.direction == 2) {
        this.slider.lockSwipeToPrev();
        // if(this.slider.isEnd){
        //   this.sliderEnded = true;
        //   //this.greeksFound = false;
        // }
    }
    if (event.direction == 4) {
        this.slider.lockSwipeToPrev();
        this.reject();
    }
  }

  ionSlideTap(key) {
    alert("Go To Extended Profile");
    let param = {uid: this.uid, interlocutor: key};   
    //let param = {uid: "this uid", interlocutor: "other user key"};
    this.navCtrl.push(ExtendedProfilePage, param);
  }
  ionSlideNextEnd(): void {
    alert("user liked this one");
  }
  goToChat(): void {
    alert('GO TO CHAT');
  }

  goToSettings(): void {
    this.navCtrl.setRoot(SettingsPage);
  }

  redo(): void {
    if(this.premium){
      if(!this.slider.isBeginning){
        this.slider.unlockSwipeToPrev();
        this.slider.slidePrev();
        this.slider.lockSwipeToPrev();
      }else{
        this.slider.lockSwipeToPrev();
      }
      
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
    this.slider.lockSwipeToPrev();
    if(this.premium){
      alert('user has bought premium - SUPERLIKE');
      this.goToNextUser();
    }else{
      alert('Load Premium Page');
    }
  }

  reject(): void {
    alert('user rejects this user');
    this.sliderEnded = false;
    this.goToNextUser();
  }

  like(): void {
    alert('user likes this user');
    this.goToNextUser();
  }

  goToNextUser(): void {
    this.slider.lockSwipeToPrev();
    // if(this.indexOfArr+1 < this.users.length){
    //   this.userActive = this.users[this.indexOfArr + 1];
    //   this.indexOfArr += 1;

    // }else{
    //   this.greeksFound = false;
    // }
    if(this.slider.isEnd){
      this.sliderEnded = true;
      this.greeksFound = false;
    }else{
      this.slider.slideNext();
    }
    alert('Load next user');
  }

}
