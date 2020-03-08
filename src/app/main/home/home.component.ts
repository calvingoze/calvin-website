import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ContentBlock } from 'src/app/models/ContentBlock';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created.  this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(400)
      ]),

      // fade out when destroyed.  this could also be written as transition('void => *')
      transition(':leave',
        animate(400, style({ opacity: 0 })))
    ]),
    trigger('SlideinAnimation', [

      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ transform: 'translateY(30px)' }),
        animate(300)
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  content1: ContentBlock;

  ngOnInit(): void {
    this.content1 = {
      imgUrl: "../../../assets/imgs/home-hero.jpg",
      header: "Title Test Boy",
      body: "Ipsum Lorem Sum Ipsum Lorem Sum Ipsum Lorem Sum Ipsum Lorem Sum Ipsum Lorem Sum Ipsum Lorem Sum Ipsum Lorem Sum Ipsum Lorem Sum Ipsum Lorem Sum Ipsum Lorem Sum ",
      imgPosition: "left"
    }
  }

}
