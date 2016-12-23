import { Component } from '@angular/core';
import { NavController, AlertController, Platform, ModalController } from 'ionic-angular';
import { PhotoModel } from '../../models/photo-model';
import { SimpleAlert } from '../../providers/simple-alert';
import { Camera, File } from 'ionic-native';
import { Data } from '../../providers/data';
import firebase from 'firebase'
import { AngularFire } from 'angularfire2';
import { UserProvider } from '../../providers/user-provider/user-provider';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { AccountPage } from '../account/account';

/*
  Generated class for the EditProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

declare var cordova;

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html'
})
export class EditProfilePage {

  loaded: boolean = false;
  photos: PhotoModel[] = [];
  storageRef = firebase.storage().ref();
  userPhotos = [];
  test = [];
  maxPhotos = false;
  user = {username: "", profile_picture: "", aboutMe: "", descent: "", areas: [], church: "", education: "", location: "", images: []};
  
  constructor(
    public userProvider: UserProvider,
    public af: AngularFire, 
    public navCtrl: NavController, 
    public dataService: Data, 
    public platform: Platform, 
    public simpleAlert: SimpleAlert, 
    public modalCtrl: ModalController, 
    public alertCtrl: AlertController,
    public storage: Storage) {
      this.checkPhotos();
      this.userProvider.getUser().then(userObservable => {
            userObservable.subscribe(user => {
                this.user = user;
                this.loaded = true;
            });
        });
     }

  ionViewDidLoad() {
    // Uncomment to use test data 
    /*this.photos = [
      new PhotoModel('http://placehold.it/100x100'), 
      new PhotoModel('http://placehold.it/100x100'), 
      new PhotoModel('http://placehold.it/100x100')
      ]*/

    this.platform.ready().then(() => {
      // this.loadPhotos();
    });
  }

  loadPhotos(): void {
    this.dataService.getData().then((photos) => {
      let savedPhotos: any = false;
      if (typeof (photos) != "undefined") {
        savedPhotos = JSON.parse(photos);
      } if (savedPhotos) {
        savedPhotos.forEach(savedPhoto => {
          this.photos.push(new PhotoModel(savedPhoto.image));
        });
      }
      this.loaded = true;
    });
  }

  createPhoto(photo): void {
    let newPhoto = new PhotoModel(photo);
    this.photos.push(newPhoto);
    this.save();
  }

  takePhoto(): any {
    if (!this.loaded) {
      return false;
    }
    if (!this.platform.is('cordova')) {
      console.log("You can only take photos on a device!");
      return false;
    }

    let options = {
      quality: 100,
      destinationType: 1, //return a path to the image on the device sourceType: 1, //use the camera to grab the image
      encodingType: 0, //return the image in jpeg format
      cameraDirection: 1, //front facing camera
      saveToPhotoAlbum: true //save a copy to the users photo album as well
    };

  Camera.getPicture(options).then(imageData =>
      (imagePath) => {
        //Grab the file name
        let currentName = imagePath.replace(/^.*[\\\/]/, '');
        //Create a new file name
        let d = new Date(),
          n = d.getTime(),
          newFileName = n + ".jpg";
        if (this.platform.is('ios')) {
          //Move the file to permanent storage
          File.moveFile(cordova.file.tempDirectory, currentName, cordova.file.dataDirectory, newFileName).then((success: any) => {
            this.createPhoto(success.nativeURL);
            this.uploadPicture(imagePath);
            this.sharePhoto(success.nativeURL);
          }, (err) => {
            console.log(err);
            let alert = this.simpleAlert.createAlert('Oops!', 'Somethingwent wrong.');
            alert.present();
          });
        } else {
          this.createPhoto(imagePath);
          this.uploadPicture(imagePath);
          this.sharePhoto(imagePath);
        }
      },
      (err) => {
        let alert = this.simpleAlert.createAlert('Oops!', 'Something went wrong.');
        alert.present();
      }
    );
  }

  takePhoto2(): void {
    if (this.loaded) {
      
    
    // if(this.maxPhotos == false){
      Camera.getPicture({
      quality : 95,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
      }).then(imageData => {
        this.uploadPicture(imageData)
      }, error => {
        console.log("ERROR -> " + JSON.stringify(error));
      });
    
    }
  }

  deleteImage(photo): void {
    var storage = firebase.storage();
    var httpsReference = storage.refFromURL(photo);
    let photosLeft = [];
    photosLeft.length = 0;
    

    httpsReference.delete().then(function() {
      // File deleted successfully
      
    }).catch(function(error) {
      // Uh-oh, an error occurred!
    });

    this.storage.get('images').then(photos => {
        for (let ph of photos) {
          
          if(ph != photo) {
            photosLeft.push(ph);
            
          }
        }
        this.storage.set('images', photosLeft);
        this.writeUserData();
    });
      
  }

  removePhoto(photo): void {
    let today = new Date();
    let index = this.photos.indexOf(photo);
    if (index > -1) {
      this.photos.splice(index, 1);
    }
  }


  sharePhoto(image): void {

  }

  save(): void {
    this.dataService.save(this.photos);
  }

uploadPicture(newFile){
  let d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpeg";

  this.userProvider.getUid().then(uid => {
    this.userPhotos.length = 0;
    this.storageRef.child('images/'+ uid + '/' + newFileName).putString(newFile, 'base64', {contentType: 'image/jpeg'}).then((savedPicture) => {
      this.storage.get('images').then(photos => {
        if(!photos){
          this.userPhotos.push(savedPicture.downloadURL);
        }else {
          for (let photo of photos) {
            this.userPhotos.push(photo);
          }
          this.userPhotos.push(savedPicture.downloadURL);
        }
        this.storage.set('images', this.userPhotos);
        this.writeUserData();
      });
    });
  });
}

writeUserData(): void {
    if(!this.maxPhotos){
      this.checkPhotos();
    }
    let photosChosen = [];
    photosChosen.length = 0;
    this.storage.get('images').then(photo => {
      for (let ph of photo) {
            photosChosen.push(ph);
          }
         
    });

    this.userProvider.getUid().then(uid => {
      let currentUserRef = this.af.database.object(`/users/${uid}`);
      if (currentUserRef) {
          currentUserRef.update({
              images: photosChosen
        });
      }
      if(this.maxPhotos){
         this.checkPhotos();
      }
    });
    
  }

  checkPhotos(): void {
    this.storage.get('images').then(photo => {
      if (photo.length == 6){
        this.maxPhotos = true;
      }else {
        this.maxPhotos = false;
      }
      
    });
  }

  done(): void{
    this.navCtrl.setRoot(AccountPage);
  }
//   // File or Blob named mountains.jpg
// file = 

// // Create the file metadata


// // Upload file and metadata to the object 'images/mountains.jpg'
// this.uploadTask = this.storageRef.child('images/' + file.name).put(file, metadata);

// // Listen for state changes, errors, and completion of the upload.
// uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
//   function(snapshot) {
//     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Upload is ' + progress + '% done');
//     switch (snapshot.state) {
//       case firebase.storage.TaskState.PAUSED: // or 'paused'
//         console.log('Upload is paused');
//         break;
//       case firebase.storage.TaskState.RUNNING: // or 'running'
//         console.log('Upload is running');
//         break;
//     }
//   }, function(error) {
//   switch (error.code) {
//     case 'storage/unauthorized':
//       // User doesn't have permission to access the object
//       break;

//     case 'storage/canceled':
//       // User canceled the upload
//       break;

//     ...

//     case 'storage/unknown':
//       // Unknown error occurred, inspect error.serverResponse
//       break;
//   }
// }, function() {
//   // Upload completed successfully, now we can get the download URL
//   var downloadURL = uploadTask.snapshot.downloadURL;
// });

 
}
