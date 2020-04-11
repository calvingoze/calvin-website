import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('skipLinkAnimation',[
      transition('unfocus => focus',[
        style({ opacity: 0 ,transform: 'translateY(-50px)'}),
        animate("200ms ease", style({ opacity: 1, transform: 'translateY(0)'}))]
      ),
      transition('focus => unfocus',[
        animate("200ms ease", style({ opacity: 0, transform: 'translateY(-50px)'}))]
      ),
      state('unfocus',
        style({opacity: 0})),
      state('focus',
        style({opacity: 1}))
    ])
  ]
})
export class AppComponent {
  title = 'calvin-website';
  linkPath: string;
  linkIndex = 1;
  focusState :string;

  constructor(
    public route: ActivatedRoute
  ){

  }

  offFocus() {
    this.focusState = "unfocus";
    setTimeout(() => { this.linkIndex = 1;}, 200)
  }

  onFocus() {
    this.linkIndex = 100001;
    this.focusState = "focus";
  }

  GetYear() {
    this.focusState = "unfocus";
    this.linkPath = location.protocol+'//'+
    location.host+
    location.pathname +
    (location.search?location.search:"") + "#main-content";
    let year = new Date().getFullYear();
    return (year >= 2020) ? year : 2020;
  }
}
