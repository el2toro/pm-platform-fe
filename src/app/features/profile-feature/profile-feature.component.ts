import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';

interface Profile{
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  aboutYou: string;
  image: string;
}

@Component({
  selector: 'app-profile-feature',
  templateUrl: './profile-feature.component.html',
  styleUrls: ['./profile-feature.component.scss'],
  imports: [ButtonModule, InputTextModule, FloatLabelModule, FormsModule, ReactiveFormsModule, FileUploadModule]
})
export class ProfileFeatureComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  form!: FormGroup;
  profile!: Profile;

  constructor() { }

  ngOnInit() {
    this.profile = {
      firstName: 'Eugenia', 
      lastName: 'Torry', 
      email: 'eugenia.torry@devcon.com', 
      phoneNumber: '+44 365 459 894', 
      aboutYou: 'I am a greate one!',
      image: 'avatar.jpg'};
    this.initForm();
  }

  initForm(){
    this.form = this.formBuilder.group({
      firstName: [this.profile.firstName],
      lastName: [this.profile.lastName],
      email: [this.profile.email],
      phoneNumber: [this.profile.phoneNumber],
      aboutYou: [this.profile.aboutYou]
    })
  }

  onBasicUploadAuto(event: any){
    this.profile.image = event.files[0].name;
  }

  deleteProfileImage(): void{
    this.profile.image = '';
  }
}
