import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { SlideinAnimation, SimpleFadeAnimation } from 'src/app/animations/basicAnimations/animations';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [SlideinAnimation, SimpleFadeAnimation]
})
export class ContactComponent implements OnInit {

  name: string;
  message: string;
  email: string;

  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Calvin Gozé | Contact");
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  messageFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  onSubmit(){
    if(this.nameFormControl.valid && this.messageFormControl.valid && this.emailFormControl.valid) {

      console.log("submitted")
      this.message = '';
      this.email = '';
      this.name = '';

    }
  }

}
