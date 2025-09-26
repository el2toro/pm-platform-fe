import { Component, inject, OnInit } from '@angular/core';
import { InputText } from "primeng/inputtext";
import { FloatLabel } from "primeng/floatlabel";
import { ButtonDirective } from "primeng/button";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequestModel } from '../models/login-request.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, } from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [InputText, FloatLabel, ButtonDirective, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  form!: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  mapFormToLoginRequest(): LoginRequestModel {
    let request = new LoginRequestModel();
    request.email = this.form.get('email')?.value;
    request.password = this.form.get('password')?.value;
    return request;
  } 

  login(){
    this.loading = true;
    let request = this.mapFormToLoginRequest();

    this.authService.login(request)
    .pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: (response) => this.router.navigate(['/dashboard'])
    });   
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }
}
