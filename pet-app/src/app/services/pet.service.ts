import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  url = 'http://localhost:3000/';
  constructor(private _http: HttpClient) { }
  create(data:any) {
    return this._http.post(this.url+'register',data);
  }
  login(data:any) {
    return this._http.post(this.url+'login',data);
  }
  addpet(data:any) {
    return this._http.post(this.url+'api/pets',data);
  }
  editpet(data:any) {
    let params = new HttpParams();
    params = params.append('id', data.id);      
    return this._http.put(this.url+'api/pets/'+data.id,data);
 }   
  getAllpets() {
    return this._http.get(this.url+'api/pets');
  } 
  deletePet(data:any){
    let params = new HttpParams();
    params = params.append('id', data.id);      
    return this._http.delete(this.url+'api/pets/'+data.id);
  }
  deleteAll(){   
    return this._http.delete(this.url+'api/pets');
  }  
}
