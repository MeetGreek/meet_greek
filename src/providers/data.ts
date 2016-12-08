import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Data {
  fbid: number;
  username: string;
  picture: string;

  constructor() {
    //this.storage.set('fbid', this.fbid);
  }

  // Get Current User's UID
  // getUid() {
  //   return this.local.get('uid');
  // }

  // // Get Info of Single User
  // getUser() {
  //   // Getting UID of Logged In User
  //   return this.getUid().then(uid => {
  //     return this.username;
  //   });
  // }
}


