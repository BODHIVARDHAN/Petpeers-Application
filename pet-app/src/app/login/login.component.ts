import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../models/role';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Role = Role;
  loginForm: FormGroup;
  userDetails: any;
  isValidForm = false;
  constructor(private router: Router, private authService: AuthService,
    private _formBuilder: FormBuilder,private user_service: UserService,
  ) { }

  ngOnInit() {
    this.userDetails = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d#@$!%*?&]{8,15}$/)])],
      role:1
    },
    );
  }
  get f() { return this.userDetails.controls; }

  onSubmit() {
    this.isValidForm = true;
    if (this.userDetails.invalid) {
      this.isValidForm = false;
      this.markAsTouched(this.userDetails);
      return;
    }
    this.user_service.login(this.userDetails.value).subscribe((data: any) => {
      if (data['status'] == "success") {
        this.router.navigate(['login']);
        this.userDetails.reset();
        this.login(1)
      }else if(data['status'] == "user Not found") {
        alert('user Not found');
      }
    });
  }

  login(role: Role) {
    this.authService.login(role);
    this.router.navigate(['/']);
  }
  gotoRegister() {
    this.router.navigate(['register'])
  }

  logout() {
    this.authService.logout();
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