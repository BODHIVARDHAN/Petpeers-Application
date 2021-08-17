import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Role } from '../models/role';

@Injectable()
export class AuthService {
    private user: User;

    isAuthorized() {
        console.log('Enters in isAuthorizes function..')
        return !!this.user;
    }

    hasRole(role: Role) {
      console.log('Enters in hasRole function..',role)
        return this.isAuthorized() 
         && this.user.Role === role;
    }

    login(role: Role) {
      this.user = { Role: role };
      console.log('Enters in login function..',this.user)
    }

    logout() {
      this.user = null;
    }
}
