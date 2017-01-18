import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/*
  Generated class for the Premium page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-premium',
  templateUrl: 'premium.html'
})
export class PremiumPage {
  slideOptions: any; 
  constructor(public viewCtrl: ViewController) {
    this.slideOptions = { 
      pager: true 
    }; 
  }

  ionViewDidLoad() {
    
  }

  oneWeek(): void {

  }

  oneMonth(): void {

  }

  sixMonths(): void {

  }

  restore(): void {
    
  }

  back(): void {
    this.viewCtrl.dismiss();
  }

}
