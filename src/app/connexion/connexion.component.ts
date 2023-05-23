import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private router: Router) {}

  ngOnInit() {}

  canShowButton() {
    return (
      this.loginForm.value.username == ''|| this.loginForm.value.password == ''
    );
  }

  onSubmit() {
    const link = ['accueil'];
    this.router.navigate(link);
  }
}
