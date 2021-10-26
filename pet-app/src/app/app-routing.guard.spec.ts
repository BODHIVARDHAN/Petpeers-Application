import { TestBed, inject, getTestBed } from '@angular/core/testing';
// import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthGuard } from './app-routing.guard';
import { AuthService } from './services/auth.service';
describe('AuthGuard', () => {
    let injector: TestBed;
    let authService: AuthService 
    let guard: AuthGuard;
    let routeMock: any = { snapshot: {}};
    let routeStateMock: any = { snapshot: {}, url: '/cookies'};
    let routerMock = {navigate: jasmine.createSpy('navigate')}

    let routerStub:any;
    beforeEach(async() => {
        routerStub = {
            navigate: jasmine.createSpy('navigate'),
          };
        TestBed.configureTestingModule({
          providers: [AuthGuard,AuthService, { provide: Router, useValue: routerStub }],
          imports: [HttpClientTestingModule],
          // schemas: [ NO_ERRORS_SCHEMA ]
        });
        injector = getTestBed();
        authService = injector.get(AuthService);
        guard = injector.get(AuthGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    
    it('should redirect an unauthenticated user to the login route', async() => {
        expect(guard.canActivate(routeMock)).toEqual(false);
        expect(routerStub.navigate).toHaveBeenCalledWith(['login']);
    });

    // it('should allow the authenticated user to access app', async() => {
    //     spyOn(authService, 'isAuthorized').and.returnValue(true);
    //     expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
    //   });

    //   it('should allow the authorise user to access app', async() => {
    //     spyOn(authService, 'hasRole').and.returnValue(true);
    //     expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
    //   });
});
