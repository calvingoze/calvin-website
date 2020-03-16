import { Component, OnInit, Input } from '@angular/core';
import { ContentBlock } from 'src/app/models/ContentBlock';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-content-block',
  templateUrl: './content-block.component.html',
  styleUrls: ['./content-block.component.css']
})
export class ContentBlockComponent implements OnInit {

  @Input() content: ContentBlock;

  posImg: number;
  posText: number;

  constructor() { }

  ngOnInit(): void {
    //this.content.body = new DOMParser().parseFromString(this.content.body, 'text/html').body.innerHTML

    if (this.content.imgPosition === "left") {
      this.posImg = 1;
      this.posText = 2;
    } else if (this.content.imgPosition === "right") {
      this.posImg = 2;
      this.posText = 1;
    }
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    if (window.innerWidth < 960) {
      this.posImg = 1;
      this.posText = 2;
    } else if (this.content.imgPosition === "right") {
      this.posImg = 2;
      this.posText = 1;
    }
  }

}
