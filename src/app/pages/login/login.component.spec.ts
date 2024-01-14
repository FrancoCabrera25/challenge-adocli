import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthService;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [AuthService],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(AuthService);
    router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set error when email is empty', () => {
    component.form.controls['email'].setValue('');
    component.form.controls['email'].markAsTouched();
    fixture.detectChanges();
    expect(component.isValidField('email')).toBeTruthy();
    expect(component.getFieldError('email')).toEqual('Este campo es requerido');
  });

  it('should set error when email is invalid', () => {
    component.form.controls['email'].setValue('AAAAAAA');
    component.form.controls['email'].markAsTouched();
    fixture.detectChanges();
    expect(component.isValidField('email')).toBeTruthy();
    expect(component.getFieldError('email')).toEqual('El email invalido');
  });

  it('should set error when password is too short', () => {
    component.form.controls['password'].setValue('123');
    component.form.controls['password'].markAsTouched();
    fixture.detectChanges();
    expect(component.isValidField('password')).toBeTruthy();
    expect(component.getFieldError('password')).toEqual(
      'Este campo requiere minimo 6 caracteres'
    );
  });

  it('should call authService.login on submit with valid data when navigate product-list', () => {
    const loginSpy = spyOn(service, 'login').and.returnValue(of(true));
    const navigateSpy = spyOn(router, 'navigate');
    component.form.setValue({
      email: 'user@demo.com',
      password: '123456',
    });
    component.onSubmit();
    expect(loginSpy).toHaveBeenCalledWith({
      email: 'user@demo.com',
      password: '123456',
    });
    expect(navigateSpy).toHaveBeenCalledWith(['product-list']);
  });
});
