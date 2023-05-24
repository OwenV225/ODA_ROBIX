import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesappService } from '../services/servicesapp.service';

@Component({
  selector: 'app-selectiondrone',
  templateUrl: './selectiondrone.component.html',
  styleUrls: ['./selectiondrone.component.css']
})
export class SelectiondroneComponent {

  constructor(private router:Router, private appservice: ServicesappService){};
  ngOnInit() {

  }

  retour(){
    const link=['accueil'];
        this.router.navigate(link);
   }

}
