import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PetService } from '../services/pet.service';
import * as pets from '../services/pets.json';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  Pets: any = (pets as any).default;
  model: any = {};
  loading = false;
  userDetails: any;
  isValidForm = false;
  constructor(
    private router: Router, private httpClient: HttpClient,
    private user_service: PetService, private _formBuilder: FormBuilder,) { }
  ngOnInit() {
    console.log('Pets', this.Pets);

    this.userDetails = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d#@$!%*?&]{8,15}$/)])],

      confirmPassword: ['', Validators.required]
    },
      //  {
      //   validator: MustMatch('password', 'confirmPassword')
      // }
    );
  }
  get f() { return this.userDetails.controls; }

  register() {
    this.isValidForm = true
    console.log('register', this.userDetails);
    console.log('aaaa', this.userDetails.value)
    if (this.userDetails.invalid) {
      this.isValidForm = false;
      this.markAsTouched(this.userDetails);
      return;
    }
    this.user_service.adduser(this.userDetails.value).subscribe((data: any) => {
      console.log('data..', data['data']);
      if(data['status'] == "exits") {
        alert("User Alredy Exits ")
      }else if (data['status'] == "success") {
        this.router.navigate(['login']);
        this.userDetails.reset();
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
