import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ChatsPage } from '../chats/chats'; 
import { AccountPage } from '../account/account';
import { UsersPage } from '../users/users';
import { Storage } from '@ionic/storage';


@Component({
	selector: 'tabs-page',
	templateUrl: 'tabs.html'
})
export class TabsPage {
	chats = ChatsPage;
	users = UsersPage;
    profile = AccountPage;

	constructor(public platform: Platform, public storage: Storage) {
    }

	ionViewDidLoad() {
        this.platform.ready().then(() => {
            this.storage.get('hasUserEnterDetails').then((result) => {
                if (!result) {
                    this.storage.set('hasUserEnterDetails', true);
                }
            });
        });
    }
}