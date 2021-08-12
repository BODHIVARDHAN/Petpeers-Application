import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as pets from './../../services/pets.json';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Pets: any = (pets as any).default;
  bookDetails: any = [];
  myBook: any = [];
  constructor(private httpClient: HttpClient){}
  ngOnInit(){
    console.log('Pets',this.Pets);
  }
 
}