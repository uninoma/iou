import { Component } from '@angular/core';
import {AuthService} from './auth/auth.service';
import { IouService } from './iou/iou.service';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers:[IouService,AuthService]
})
export class AppComponent  {
  name = 'Angular';
  constructor(public iouService:IouService,public authService:AuthService){

  }
 
  
}
