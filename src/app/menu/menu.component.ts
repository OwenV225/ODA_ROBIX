import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { ServicesappService } from '../services/servicesapp.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  user:any;
  deco:any;
  constructor(private _location: Location,private appservice: ServicesappService,private router:Router)
  {}

  backClicked() {
    this._location.back();
  }
  ngOnInit() {
    this.getUser()
  }
  getUser(){
    this.user = this.appservice.getItem('myData');
    console.log(this.user)
  }
  logout(){
    this.deco = this.appservice.removeItem('myData');

      const link = [''];
      this.router.navigate(link);
    
  }
}
