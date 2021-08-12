import { Component, OnInit } from '@angular/core';
import * as pets from './../services/pets.json';
import { Role } from '../models/role';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
declare var $ :any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Role = Role;
  p=1
  Pets: any = (pets as any).default;
  newpetDetails: any;
  isValidForm: boolean=false;
  PetData: any;

  constructor(private _formBuilder: FormBuilder,
    private user_service: UserService){}
  ngOnInit(){
    console.log('Pets',this.Pets);
    this.newpetDetails = this._formBuilder.group({
      pet_name: ['', Validators.required],
      pet_place: ['', Validators.required],
      pet_age: ['', Validators.required],
      borrowed_status:1
    },
    );
    this.getAllpets()
  }
  get f() { return this.newpetDetails.controls; }

  getAllpets(){
    this.user_service.getAllpets().subscribe((data: any) => {
      console.log('data,,',data);
      this.PetData = data['PetData'] || '';
      console.log('PetData,,',this.PetData);
  });
  }
  openModel(){
    $('#exampleModal').modal('show')
  }
  closeModel(){
    $('#exampleModal').modal('hide');
    this.newpetDetails.reset();
  }
  onSubmit() {
    this.isValidForm = true;
    console.log('aaaa', this.newpetDetails.invalid)
    if (this.newpetDetails.invalid) {
      this.isValidForm = false;
      this.markAsTouched(this.newpetDetails);
      return;
    } 
    this.user_service.addpet(this.newpetDetails.value).subscribe((data: any) => {
        console.log('data,,',data);
        if(data['status'] == "exits") {
          alert("User Alredy Exits ")
        }else if (data['status'] == "success") {
          // this.router.navigate(['login']);
          $('#exampleModal').modal('hide');
          this.newpetDetails.reset();
        }
    });
  }
  markAsTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).map((field) => {
      const control = group.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.markAsTouched(control);
      }
    });
  }
}