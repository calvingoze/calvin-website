import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calvin-website';
  linkPath: string;
  linkIndex = 1;

  constructor(
    public route: ActivatedRoute
  ){

  }

  GetYear() {
    this.linkPath = location.protocol+'//'+
    location.host+
    location.pathname +
    (location.search?location.search:"") + "#main-content";
    let year = new Date().getFullYear();
    return (year >= 2020) ? year : 2020;
  }
}
