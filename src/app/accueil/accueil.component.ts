import { Component , ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { ServicesappService } from '../services/servicesapp.service';


@Component({


  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {

  @ViewChild('modalagricol') modal: any;

  messageSuccess = false

 selectedOption : any;
  affichPagin :any;
  files: any;
  robots: any[] = [];
  drones: any[] = [];
  p :number = 1;
  interPage :number = 8;
  itemsTotal : number = 0;
  total : any;
  searchText:  any;
  myList:any;
  i = 10;
  url:any;
  displayImg :boolean= false;
  file: any;

  selectedFile: any;

  page : number = 1;
  count : number = 0;
  tableSize : number = 8;
  tableSizes : any = [5, 10, 15, 20];
  myForm!:FormGroup;
  myFormDrone!:FormGroup;
  defaultValueHostname: string = 'local-tello';
  defaultValueUserId: any;
  defaultValueTypeEngin: string = 'robot agriculture';
  condition: boolean = true;
  user:any;
  constructor(private router:Router, private fb:FormBuilder, private appservice: ServicesappService, private location: Location){
    this.getRobot(),
    //this.getDrone(),
    this.createForm(),
    this.createFormDrone()
  };
  ngOnInit() {
    this.getRobot(),
    this.getDrone(),
    this.createForm(),
    this.createFormDrone(),
    this.getUser()
  }

  get f(){
    return this.myForm.controls;
  }
  get g(){
    return this.myFormDrone.controls;
  }
  getUser(){
    this.user = this.appservice.getItem('myData');
    //console.log(this.user.user.nom)
    this.defaultValueUserId = this.user.user._id
  }
  createForm(){
    this.myForm = this.fb.group({
      hostname:['',Validators.required],
      model: ['',Validators.required],

      nom:['',Validators.required],
      fabriquant: ['',Validators.required],

      poids:['',Validators.required],
      autonomie: ['',Validators.required],

      typeEngin: ['',Validators.required],
      //testImage: ['',Validators.required],
      userId: ['', Validators.required],

      testImage: ['',Validators.required],
    })
  }

  createFormDrone(){
    this.myFormDrone = this.fb.group({
      hostname:['',Validators.required],
      model: ['',Validators.required],

      nom:['',Validators.required],
      fabriquant: ['',Validators.required],

      poids:['',Validators.required],
      autonomie: ['',Validators.required],

      typeEngin: ['',Validators.required],
      //testImage: ['',Validators.required],
      userId: ['',Validators.required],
    })
  }

  reloadPage() {
    this.location.forward;
  }

  getRobot(){
    this.user = this.appservice.getItem('myData');
    console.log("robot: "+this.user.user._id)
    this.appservice.getUserRobot(this.user.user._id).subscribe(
      (res)=>{
        this.robots = res;
        console.log("robot: "+this.robots);
      }
    )
  }


  getDrone(){
    this.user = this.appservice.getItem('myData');
    this.appservice.getUserDrone(this.user.user._id).subscribe(
      (res)=>{
        this.drones = res;
        console.log(this.drones);
      }
    )
  }


  // uploadImage(e:any){
  //   if (e.target.files) {
  //     this.files = e.target.files[0];
  //     var reader = new FileReader();
  //     reader.readAsDataURL(e.target.files[0]);
  //     reader.onload = (event:any)=>{
  //       this.url = event.target.result;
  //     }
  //     console.log(this.files);

  //   }
  //    this.myForm.patchValue({
  //     LienImage:this.files
  //   });
  //   this.myForm.get('testImage')?.updateValueAndValidity();
  //}

  onFileSelected(event: any) {

    if (event.target.files) {
      this.files = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any)=>{
        this.url = event.target.result;
        this.displayImg = true;
      }
      console.log(this.files);

    }

    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
  }

  submitData() {

    /* let formdata : FormData = new FormData();
    formdata.set('nom', this.myForm.value.nom)
    formdata.set('model', this.myForm.value.model)
    formdata.set('fabriquant', this.myForm.value.fabriquant)
    formdata.set('poids', this.myForm.value.poids)
    formdata.set('autonomie', this.myForm.value.autonomie)
    //formdata.set('testImage', this.myForm.value.testImage)
    formdata.set('hostname', this.myForm.value.hostname)
    formdata.set('userId', this.myForm.value.userId)
    formdata.set('typeEngin', this.myForm.value.typeEngin)


    formdata.set('testImage', this.selectedFile);

    //console.log(formdata)

    this.appservice.addRobot(formdata).subscribe((res) => {
     console.log()
    })
    */

     const formData = new FormData();
    formData.append('nom', this.myForm.value.nom);
    formData.append('model', this.myForm.value.model);
    formData.append('fabriquant', this.myForm.value.fabriquant);
    formData.append('poids', this.myForm.value.poids);
    formData.append('autonomie', this.myForm.value.autonomie);
    formData.append('hostname', this.myForm.value.hostname);
    formData.append('userId', this.myForm.value.userId);
    formData.append('typeEngin', this.myForm.value.typeEngin);
    formData.append('testImage', this.selectedFile);

    this.appservice.addRobot(formData).subscribe(
      (res) => {


        console.log(res);


        window.location.reload();


// Fermez le modal en supprimant la classe "show" et en ajoutant la classe "hide"



        // Réinitialiser le formulaire après l'enregistrement réussi
        this.myForm.reset();

      },
      (error) => {
        console.error(error);
      }
    );
}


  //addRobot(){
    //alert("ok")
    //console.log("valeur:" + this.myForm.value.nom +" "+this.myForm.value.hostname);
    //const formData = new FormData();

    //const formData = new FormData();
    //formData.append('testImage', this.selectedFile, this.selectedFile)
     //this.appservice.addRobot(this.myForm.value.hostname,this.myForm.value.nom,this.myForm.value.model,this.myForm.value.fabriquant,this.myForm.value.poids,this.myForm.value.autonomie,this.myForm.value.userId,this.myForm.value.typeEngin, this.myForm.value.testImage).subscribe(
      //(res)=>{
        //Swal.fire('Succes!', 'Votre drone a bien été enreistré', 'success');

        // const link=['accueil'];
        // this.router.navigate(link);
        //console.log('ok......')
      //}
    //)

  // Ajouter les champs du formulaire à FormData
  // formData.append('nom', this.myForm.value.nom);
  // formData.append('hostname', this.myForm.value.hostname);
  // formData.append('model', this.myForm.value.model);
  // // Ajouter l'image (remplacez 'file' par le nom approprié)
  // formData.append('testImage', this.selectedFile);

  // // Appeler la méthode pour envoyer les données du formulaire
  //   this.submitForm(formData);

  //}


addDrone(){
  const formData = new FormData();
  formData.append('nom', this.myFormDrone.value.nom);
  formData.append('model', this.myFormDrone.value.model);
  formData.append('fabriquant', this.myFormDrone.value.fabriquant);
  formData.append('poids', this.myFormDrone.value.poids);
  formData.append('autonomie', this.myFormDrone.value.autonomie);
  formData.append('hostname', this.myFormDrone.value.hostname);
  formData.append('userId', this.myFormDrone.value.userId);
  formData.append('typeEngin', this.myFormDrone.value.typeEngin);
  formData.append('testImage', this.selectedFile);

    this.appservice.addDrone(formData).subscribe(
      (res)=>{

        window.location.reload();
        this.myFormDrone.reset();
        // const link=['accueil'];
        // this.router.navigate(link);
        //console.log('ok......')
      }
    )
  }


donR = [
    {libele : "robot 1", type : "agro", img:"assets/images/rbt1.png"},
    {libele : "robot 2", type : "planteur", img:"assets/images/rb2.png"},
    {libele : "robot 3", type : "semeur", img:"assets/images/robo1.png"},
    {libele : "robot 4", type : "recolteur", img:"assets/images/robot2.png"},
    {libele : "robot 5", type : "vionneur", img:"assets/images/robot3.png"},
    {libele : "robot 6", type : "chargeur", img:"assets/images/robot4.png"},
    {libele : "robot 7", type : "nettoyeur", img:"assets/images/robot5.png"},
    {libele : "robot 8", type : "marcheur", img:"assets/images/robot6.png"},
    {libele : "robot 9", type : "trier", img:"assets/images/robot2.png"},
    {libele : "robot 10", type : "assisteur", img:"assets/images/robot5.png"},
    {libele : "robot 11", type : "deserbeur", img:"assets/images/robot2.png"},
    {libele : "robot 12", type : "paysan", img:"assets/images/robo1.png"},
    {libele : "robot 13", type : "cultuvateur", img:"assets/images/rb2.png"},
    {libele : "robot 14", type : "tomateur", img:"assets/images/robot2.png"},
    {libele : "robot 15", type : "tonte", img:"assets/images/robot6.png"},
    {libele : "robot 16", type : "enjambeurs", img:"assets/images/rb2.png"},
    {libele : "robot 17", type : "viticoles", img:"assets/images/robo1.png"},
    {libele : "robot 18", type : "bineuses", img:"assets/images/robot1.png"},
    {libele : "robot 19", type : "coboteur", img:"assets/images/rbt1.png"},
    {libele : "robot 20", type :"récolteur", img:"assets/images/robot2.png"},
    {libele : "robot 21", type : "pulvérisateur", img:"assets/images/rb2.png"},
    {libele : "robot 22", type : "bineuseur", img:"assets/images/robot6.png"},
    {libele : "robot 23", type : "deserbeur", img:"assets/images/robot1.png"},
    {libele : "robot 24", type : "vionneur", img:"assets/images/robot5.png"},
  ]
donD = [
    {libele : "drone 1", type : "aéroDrone", img:"assets/images/drone8.png"},
    {libele : "drone 2", type : "Nimbus", img:"assets/images/drone1.png"},
    {libele : "drone 3", type : "AeroX", img:"assets/images/drone2.png"},
    {libele : "drone 4", type : "PlaneurÉtoilé", img:"assets/images/drone3.png"},
    {libele : "drone 5", type : "AileTonnerre", img:"assets/images/drone4.png"},
    {libele : "drone 6", type : "HorizonVolant", img:"assets/images/drone5.png"},
    {libele : "drone 7", type : "DroneFurtif", img:"assets/images/drone6.png"},
    {libele : "drone 8", type : "CoureurDeLames", img:"assets/images/drone7.png"},
    {libele : "drone 9", type : "cielvoyageur", img:"assets/images/drone2.png"},
    {libele : "drone 10", type : "volAurore", img:"assets/images/drone8.png"},
    {libele : "drone 11", type : "maîtreDesAiles", img:"assets/images/drone6.png"},
    {libele : "drone 12", type : "solarHawk", img:"assets/images/drone5.png"},
    {libele : "drone 13", type : "droneNova", img:"assets/images/drone4.png"},
    {libele : "drone 14", type : "tourbillon volant", img:"assets/images/drone2.png"},
    {libele : "drone 15", type : "ailephénix", img:"assets/images/drone1.png"},
    {libele : "drone 16", type : "aeroglide", img:"assets/images/drone8.png"},
    {libele : "drone 17", type : "libellule", img:"assets/images/drone8.png"},
    {libele : "drone 18", type : "cielVif", img:"assets/images/drone1.png"},
    {libele : "drone 19", type : "drone eclipse", img:"assets/images/drone2.png"},
    {libele : "drone 20", type :"envergure", img:"assets/images/drone7.png"},
    {libele : "drone 21", type : "pulvérisateur", img:"assets/images/drone7.png"},
    {libele : "drone 22", type : "aerospectre", img:"assets/images/drone5.png"},
    {libele : "drone 23", type : "starslider", img:"assets/images/drone3.png"},
    {libele : "drone 24", type : "skyvoyager", img:"assets/images/drone1.png"},
  ]


  selectionEngin(){
    const link=['selectionrobo'];
        this.router.navigate(link);
   }
   selectionEngindrone(){
    const link=['selectiondrone'];
        this.router.navigate(link);
   }

   onTableDataChange(event:any){
    this.page = event;
    this.getRobot(),
    this.getDrone()
   }

   OnTableSizeChange(event:any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getRobot(),
    this.getDrone()
   }

   onSelectionChange(event: any) {
    this.selectedOption = event.target.value;
  }
  onLinkClick(value: string) {
  this.affichPagin = value;
  // Autres actions à effectuer avec la valeur cliquée
  // ...
  }
  nopT(){
    this.router.navigateByUrl('/dash')

 }

}
