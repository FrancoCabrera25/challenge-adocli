import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../interface/user.interface';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService],
    }).compileComponents();

    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should login successfully with correct credentials', () => {
      const loginRequest: LoginRequest = {
        email: 'user@demo.com',
        password: '123456',
      };
      const expectedToken = service.getToken();

      service.login(loginRequest).subscribe((isLoggedIn) => {
        expect(isLoggedIn).toBeTruthy();
        expect(localStorage.getItem('token')).toEqual(expectedToken);
        expect(service.isAuthenticated).toBeTruthy();
      });
    });

    it('should return an error with incorrect credentials', () => {
      const loginRequest: LoginRequest = {
        email: 'wrong@email.com',
        password: 'wrong',
      };

      service.login(loginRequest).subscribe({
        error: (error) =>
          expect(error).toBe('Email/password incorrecto'),
      });
    });
  });

  it('should logout successfully', () => {
    const navigateSpy = spyOn(router, 'navigate');
    service.logout();

    expect(service.isAuthenticated()).toBeFalsy();
    expect(localStorage.getItem('token')).toBeNull();
    expect(navigateSpy).toHaveBeenCalledWith(['login']);
  });

  it('should get the token', () => {
    const expectedToken = 'ASDASDASDASDASDASDASD';
    expect(service.getToken()).toBe(expectedToken);
  });
});
