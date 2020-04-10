import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BlogPost } from 'src/app/models/BlogPost';

@Component({
    selector: 'blog-edit-modal',
    templateUrl: './blog-edit-modal.html',
  })
  export class BlogEditDialog {
  
    constructor(
      public dialogRef: MatDialogRef<BlogEditDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any
      ) {}
  }