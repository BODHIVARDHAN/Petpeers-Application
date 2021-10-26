import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as pets from './../../services/pets.json';
import { Role } from '../../models/role';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PetService } from '../../services/pet.service';
declare var $ :any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Role = Role;
  p=1
  // Pets: any = (pets as any).default;
  newpetDetails: any;
  isValidForm: boolean=false;
  PetData: any;

  constructor(private _formBuilder: FormBuilder,
    private user_service: PetService){}
  ngOnInit(){
    // console.log('Pets',this.Pets);
    this.newpetDetails = this._formBuilder.group({
      pet_name: ['', Validators.required],
      pet_place: ['', Validators.required],
      pet_age: ['', Validators.required],
      borrowed_status:1,
      id:''
    },
    );
    this.getAllpets()
  }
  get f() { return this.newpetDetails.controls; }

  getAllpets(){
    this.user_service.getAllpets().subscribe((data: any) => {
      console.log('data,,',data);
      this.PetData = data;
      console.log('PetData,,',this.PetData);
  });
  }
  openModel(){
    this.newpetDetails.reset();
    $('#exampleModal').modal('show')
  }
  closeModel(){
    $('#exampleModal').modal('hide');
    this.newpetDetails.enable()
    this.newpetDetails.reset();    
  }
  onSubmit() {
    this.isValidForm = true;
    if (this.newpetDetails.invalid) {
      this.isValidForm = false;
      this.markAsTouched(this.newpetDetails);
      return;
    }
    if(this.newpetDetails.value.id == undefined || this.newpetDetails.value.id == null || this.newpetDetails.value.id == ''){
      this.user_service.addpet(this.newpetDetails.value).subscribe((data: any) => {
         if(data['status'] == "exits") {
            alert("User Alredy Exits ")
          }else if (data['status'] == "success") {
            // this.router.navigate(['login']);
            $('#exampleModal').modal('hide');
            this.newpetDetails.reset();
            this.getAllpets()
          }
      });
    }else{
      this.user_service.editpet(this.newpetDetails.value).subscribe((data: any) => {
        if(data['status'] == "exits") {
          alert("User Alredy Exits ")
        }else if (data['status'] == "success") {
          // this.router.navigate(['login']);
          $('#exampleModal').modal('hide');
          this.newpetDetails.reset();
          this.getAllpets()
        }
    });
    }
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
  editaPetsData(petData:any){
    $('#exampleModal').modal('show');
    this.newpetDetails.patchValue(petData);
  }
  viewDetails(petData:any){
    $('#exampleModal').modal('show');
    this.newpetDetails.patchValue(petData);
    this.newpetDetails.disable()
  }
  deletePet(petData:any){
    this.newpetDetails.patchValue(petData);
    this.user_service.deletePet(this.newpetDetails.value).subscribe((data: any) => {
      if (data['status'] == "success") {
        this.newpetDetails.reset();
        this.getAllpets()
      }
  });
  }
  deleteAll(){
    this.user_service.deleteAll().subscribe((data: any) => {
      if (data['status'] == "success") {
        alert(data['message']);
        window.location.reload()
      }
  });
  }
}