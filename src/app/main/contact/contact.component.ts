import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { SimpleFadeAnimation, SendOffAnimation, SlideinAnimation } from 'src/app/animations/basicAnimations/animations';
import { ContactService } from 'src/app/services/contact.service';

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
  animations: [SendOffAnimation, SimpleFadeAnimation, SlideinAnimation]
})
export class ContactComponent implements OnInit {

  sent: boolean;
  thankYou: boolean;

  name: string;
  message: string;
  email: string;

  constructor(
    private titleService: Title,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.sent = false;
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

  onSubmit() {
    if (this.nameFormControl.valid && this.messageFormControl.valid && this.emailFormControl.valid && !this.sent) {
      this.sent = true;
      this.contactService.sendMessage(this.name, this.email, this.message);
      setTimeout(() => { this.thankYou = true }, 600)
    }
  }

}
