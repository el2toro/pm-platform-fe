import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { MenuComponent } from "../components/menu/menu.component";
import { DashboardNavComponent } from "../../features/dashboard-feature/components/dashboard-nav/dashboard-nav.component";
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "../auth/login/login.component";
import { RegisterComponent } from "../auth/register/register.component";

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  imports: [MenuComponent, RouterOutlet, DashboardNavComponent, LoginComponent, RegisterComponent]
})
export class ShellComponent implements OnInit {
   private authService = inject(AuthService);
   isLogin = true;
   isRegister = false;
   
  get userIsLoggedIn(): boolean{
    return this.authService.isLoggedIn;
  }
  constructor() { }

  ngOnInit() {
  }
  
  setIsLogin(){
    this.isLogin = !this.isLogin;
  }
}
