import { Component, inject, OnInit } from '@angular/core';
import { InputText } from "primeng/inputtext";
import { FloatLabel } from "primeng/floatlabel";
import { ButtonDirective } from "primeng/button";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequestModel } from '../models/login-request.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegisterRequestModel } from '../models/register-request.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FloatLabel, ReactiveFormsModule, InputText, ButtonDirective]
})
export class RegisterComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  
  form!: FormGroup;
  loading = false;

  constructor() { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      tenantName: ['']
    });
  }

  mapFormToLoginRequest(): RegisterRequestModel {
    let request = new RegisterRequestModel();
    request.firstName = this.form.get('firstName')?.value;
    request.lastName = this.form.get('lastName')?.value;
    request.email = this.form.get('email')?.value;
    request.password = this.form.get('password')?.value;
    request.tenantName = this.form.get('tenantName')?.value;

    return request;
  }

  createAccount(){
    this.loading = true;
    let request = this.mapFormToLoginRequest();

    this.authService.register(request)
    .pipe(
      finalize(() => this.loading = false)
    )
    .subscribe({
      next: (response) => this.router.navigate(['/login']),
      //error: (error) => this.loading = false
    });   
  }
}
