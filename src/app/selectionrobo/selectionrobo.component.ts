import { Component } from '@angular/core';
import { AppserviceService } from '../services/appservices.service';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-selectionrobo',
  templateUrl: './selectionrobo.component.html',
  styleUrls: ['./selectionrobo.component.css']
})
export class SelectionroboComponent {

  robots: any[] = [];
  drones: any[] = [];

  constructor(private router:Router, private appservice: AppserviceService){};
  ngOnInit(): void {
    this.RenderChart();
    }
    RenderChart() {
      const mychart= new Chart("piechart", {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderColor: [
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  getRobot(): void{
    this.appservice.getUserRobot().subscribe(
      (res)=>{
        this.robots = res;
        console.log(this.robots);
      }
    )
  }
  getDrone(){
    this.appservice.getUserDrone().subscribe(
      (res)=>{
        this.drones = res;
        console.log(this.drones);
      }
    )
  }
  retour(){
    const link=['accueil'];
        this.router.navigate(link);
   }



}








