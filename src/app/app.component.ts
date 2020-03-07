import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calvin-website';

  GetYear() {
    let year = new Date().getFullYear();
    return (year >= 2020) ? year : 2020;
  }
}
