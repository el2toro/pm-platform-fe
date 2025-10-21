import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Input,
  NgZone,
  OnInit,
  Output,
} from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonDirective } from 'primeng/button';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequestModel } from '../models/login-request.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { CustomMessageService } from '../../../../shared/services/custom-message.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    InputText,
    FloatLabel,
    ButtonDirective,
    ReactiveFormsModule,
    ToastModule,
  ],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @Output() isLogin = new EventEmitter();
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(CustomMessageService);
  private ngZone = inject(NgZone);

  form!: FormGroup;
  loading = false;
  google: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  ngAfterViewInit(): void {
    this.renderGoogleButton();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  mapFormToLoginRequest(): LoginRequestModel {
    let request = new LoginRequestModel();
    request.email = this.form.get('email')?.value;
    request.password = this.form.get('password')?.value;
    return request;
  }

  login() {
    this.loading = true;
    let request = this.mapFormToLoginRequest();

    this.authService
      .login(request)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => this.router.navigate(['/dashboard']),
        error: (error) => {
          this.messageService.showError(
            'Login Failed. Please check your credentials and try again.'
          );
        },
      });
  }

  signInWithGoogle() {}

  goToRegister() {
    this.isLogin.emit(false);
    this.router.navigate(['/register']);
  }

  renderGoogleButton() {
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id:
          '425629473287-qgkfafn34j9o649p81p287shogmiturc.apps.googleusercontent.com',
        callback: (response: any) => this.handleCredentialResponse(response),
      });

      google.accounts.id.renderButton(document.getElementById('googleButton'), {
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
        logo_alignment: 'left',
      });

      // Optional: show “One Tap” prompt
      google.accounts.id.prompt();
    } else {
      console.error('Google script not loaded');
    }
  }

  handleCredentialResponse(response: any) {
    console.log('Google Credential:', response.credential);
    // Here you can POST the credential to your backend
        this.authService.googleLogin(response).subscribe({
          next: () => this.router.navigate(['/dashboard'])
        });
  }
}
