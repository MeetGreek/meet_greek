import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth-provider/auth-provider';
import { UserProvider } from '../../providers/user-provider/user-provider';
import { UtilProvider } from '../../providers/utils';
import { ChurchPage } from '../church/church';

/*
  Generated class for the Areas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-areas',
  templateUrl: 'areas.html'
})
export class AreasPage {
  atticaStatus: boolean;
  pelopenneseStatus: boolean;
  eviaStatus: boolean;
  stereaElladaStatus: boolean;
  thessalyStatus: boolean;
  epirusStatus: boolean;
  macedoniaStatus: boolean;
  thraceStatus: boolean;
  eptanisaStatus: boolean;
  dodekanisaStatus: boolean;
  kykladesStatus: boolean;
  sporadesStatus: boolean;
  creteStatus: boolean;

  places = [];

  constructor(
    public nav: NavController,
    public af: AngularFire,
    public auth: AuthProvider,
    public userProvider: UserProvider,
    public util: UtilProvider,
    public storage: Storage) {

    }

  ionViewDidLoad() {
    
  }

  next(): void {
    this.places = [];
    if(this.atticaStatus){
      this.places.push("Attica");
    }
    if(this.pelopenneseStatus){
      this.places.push("Peloponnese");
    }
    if(this.eviaStatus){
      this.places.push("Evia");
    }
    if(this.stereaElladaStatus){
      this.places.push("Sterea Ellada");
    }
    if(this.thessalyStatus){
      this.places.push("Thessaly");
    }
    if(this.epirusStatus){
      this.places.push("Epirus");
    }
    if(this.macedoniaStatus){
      this.places.push("Macedonia");
    }
    if(this.eptanisaStatus){
      this.places.push("Eptanisa");
    }
    if(this.dodekanisaStatus){
      this.places.push("Dodekanisa");
    }
    if(this.kykladesStatus){
      this.places.push("Kyklades");
    }
    if(this.sporadesStatus){
      this.places.push("Sporades");
    }
    if(this.creteStatus){
      this.places.push("Crete");
    }

    this.storage.set('areas', this.places);
    this.writeUserData();
    this.nav.push(ChurchPage);
  }

  writeUserData(): void {
    let areasChosen;
      
    this.storage.get('areas').then(areas => {
      areasChosen = areas;
    });

    this.userProvider.getUid().then(uid => {
      let currentUserRef = this.af.database.object(`/users/${uid}`);
      if (currentUserRef) {
          currentUserRef.update({
              areas: areasChosen
        });
      } 
    });
  }

}
