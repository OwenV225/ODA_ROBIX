import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesappService {

  constructor(private http:HttpClient) { }
  getUserRobot(userId:any){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    let object = {
      "userIdOk": userId,
    }
    return this.http.post<any>('http://127.0.0.1:3000/robot/robots/user',object,{ headers })
  }

  getUserDrone(userId:any){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    let object = {
      "userIdOk": userId,
    }
    // return this.http.get<any>('http://127.0.0.1:3000/robot/robots',{headers})
    return this.http.post<any>('http://127.0.0.1:3000/drone/drones/user',object,{ headers })
  }
//getRobotId1(id: any):Observable<any> {
  //return this.getUserRobot().pipe(
    //map(
      //robots=>robots.find(hotel=>hotel._id ===id)
    //)
  //)
    //return this.http.get<any>('http://127.0.0.1:3000/robot/robots/',id)
  //}

  getRobotId(id: any) {
    const url = `http://127.0.0.1:3000/robot/robots/${id}`;
    return this.http.get<any>(url);
    //return this.http.get<any>('http://127.0.0.1:3000/robot/robots/',id)
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  addRobot(formData: FormData) {
    const headers = new HttpHeaders();
    // Ne pas définir le type de contenu (laisser le navigateur gérer)
    // headers.delete('Content-Type');
    return this.http.post<any>('http://127.0.0.1:3000/robot/robots', formData, { headers });
  }

  addDrone(formData:FormData){
    const headers = new HttpHeaders();

    return this.http.post<any>('http://127.0.0.1:3000/drone/drones',formData,{ headers });
  }


  public connexion(telephone:any,password: any){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    let object = {
      "telephone": telephone,
      "password": password,
    }
    return this.http.post<any>('http://127.0.0.1:3000/auth/login',object,{ headers });
  }
}
