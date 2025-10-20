import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { Toast } from "primeng/toast";
import { CustomMessageService } from '../../../shared/services/custom-message.service';
import { Router } from '@angular/router';

interface Profile{
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  aboutYou: string;
  image: string;
  birthDate: string;
  address: string;
}

@Component({
  selector: 'app-profile-feature',
  templateUrl: './profile-feature.component.html',
  styleUrls: ['./profile-feature.component.scss'],
  imports: [ButtonModule, InputTextModule, FloatLabelModule, FormsModule, ReactiveFormsModule, FileUploadModule, Toast]
})
export class ProfileFeatureComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private customMessageService = inject(CustomMessageService);
  private router = inject(Router);
  form!: FormGroup;
  profile!: Profile;
  buttonDisabled = true;

  constructor() { }

  ngOnInit() {
    this.profile = {
      firstName: 'Eugenia', 
      lastName: 'Torry', 
      email: 'eugenia.torry@devcon.com', 
      phoneNumber: '+44 365 459 894', 
      aboutYou: 'I am a greate one!',
      image: 'avatar.jpg',
      birthDate: '25/02/1998',
      address: '23 Avenue, Paris, France'};
    this.initForm();
  }

  initForm(){
    this.form = this.formBuilder.group({
      firstName: [this.profile.firstName],
      lastName: [this.profile.lastName],
      email: [this.profile.email],
      phoneNumber: [this.profile.phoneNumber],
      aboutYou: [this.profile.aboutYou],
      birthDate: [this.profile.birthDate],
      address: [this.profile.address]
    })

    this.form.valueChanges.subscribe(() => {
      this.buttonDisabled = false;
    })
  }

  onBasicUploadAuto(event: any){
    this.profile.image = event.files[0].name;
  }

  deleteProfileImage(): void{
    this.profile.image = '';
  }

  cancel(){
    this.router.navigate(['/dashboard']);
  }

  save(){
    this.customMessageService.showSuccess('Profile updated successfully!');
  }
}
