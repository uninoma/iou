import { Component, OnInit } from '@angular/core';
import { IouService } from '../iou/iou.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(public iouService:IouService,public authService:AuthService) {
  }
I
  ngOnInit() {

  }

}