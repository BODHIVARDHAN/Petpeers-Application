import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Users } from '../models/users';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
    url = 'http://localhost:3000/';
    constructor(private _http: HttpClient) { }
    create(data:any) {
      return this._http.post(this.url+'register',data);
    }
    login(data:any) {
      return this._http.post(this.url+'login',data);
    }
    addpet(data:any) {
      return this._http.post(this.url+'addpet',data);
    }
    getAllpets() {
      return this._http.get(this.url+'getAllpets');
    }
  
}
