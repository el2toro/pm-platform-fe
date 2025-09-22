import { Component, OnInit } from '@angular/core';
import { InputText } from "primeng/inputtext";
import { FloatLabel } from "primeng/floatlabel";
import { ButtonDirective } from "primeng/button";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequestModel } from '../models/login-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [InputText, FloatLabel, ButtonDirective]
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, 
    private router: Router) { }

  ngOnInit() {
  }

  login(){
    //TODO: Add real service api call 
    let request = new LoginRequestModel();
    request.email = 'michael.smith@tenant123.com'
    request.password = 'Password123'
    
    this.authService.login(request).subscribe({
      next: (response) => this.router.navigate(['/dashboard'])
    });   
  }
}
