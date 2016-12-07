import { Component } from '@angular/core';
import { Data } from '../../providers/data';
import { Facebook } from 'ionic-native';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  chatMessage: string = '';
  messages: any = [];
  constructor(public dataService: Data) {

  }

  sendMessage(): void {
    
  }
}