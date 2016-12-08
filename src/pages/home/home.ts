import { Component } from '@angular/core';
import { Data } from '../../providers/data';
import { Facebook } from 'ionic-native';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  chatMessage: string = '';
  messages: any = [];
  currentUser: number;
  currentUserImage: string;
  // currentUser: any;
  constructor(public dataService: Data) {
    // this.currentUser.id = this.dataService.fbid
    this.currentUser = this.dataService.fbid;
    this.currentUserImage = this.dataService.picture;
  }

  sendMessage(): void {

  }
}