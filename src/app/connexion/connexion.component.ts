import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ServicesappService } from '../services/servicesapp.service';

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
  localStorage: any;
  constructor(private router: Router, private fb:FormBuilder, private serviceApp:ServicesappService) {}
  myForm!:FormGroup;
  ngOnInit() {
    this.createForm();
  }

  get g(){
    return this.myForm.controls;
  }
  createForm(){
    this.myForm = this.fb.group({
      telephone:['',Validators.required],
      password: ['',Validators.required]
    })
  }
  canShowButton() {
    return (
      this.myForm.value.username == ''|| this.myForm.value.password == ''
    );
  }

  onSubmit() {

    this.serviceApp.connexion(this.myForm.value.telephone,this.myForm.value.password).subscribe(
      (res)=>{
        const link = ['accueil'];
        this.router.navigate(link);
        const data = res;
        this.serviceApp.setItem('myData', data);
      }
    )
    //console.log(this.myForm.value.telephone)
  }
}
