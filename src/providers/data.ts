import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

@Injectable()
export class Data {
  userEmail: string;
  userName: string;
  userPicture: string;

  constructor(public http: Http) {
    
  }

}
