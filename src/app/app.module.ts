import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { IouComponent } from './iou/iou.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { IouService } from './iou/iou.service';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './auth/login.component';




const firebaseConfig = {
  apiKey: "AIzaSyBccw2lQjD5EN2Bf4cMK0UIIFUURYPK_6s",
  authDomain: "mixerapp-47fcb.firebaseapp.com",
  databaseURL: "https://mixerapp-47fcb.firebaseio.com",
  projectId: "mixerapp-47fcb",
  storageBucket: "mixerapp-47fcb.appspot.com",
  /*messagingSenderId: "909474158587"*/
};



@NgModule({
  imports: [BrowserModule, FormsModule, AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule],
  declarations: [AppComponent, HelloComponent, IouComponent, NavComponent, LoginComponent],
  bootstrap: [AppComponent],
  providers: [IouService]
})
export class AppModule { }
