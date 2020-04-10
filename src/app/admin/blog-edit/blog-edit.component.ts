import { COMMA, SPACE} from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/models/BlogPost';
import { BlogService } from 'src/app/services/blog.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogEditDialog } from './blog-edit-modal'
import { MatDialog } from '@angular/material/dialog';
import { firestore, storage } from 'firebase';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { ckeditorAdapterFactory } from './CkeditorFirestorageAdapter'
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {

  formBlogPost: BlogPost;
  currentBlogPosts: BlogPost[];
  separatorKeysCodes: number[] = [COMMA, SPACE];
  tagCtrl = new FormControl();

  public Editor = ClassicEditor;
  public ckConfig = {
    extraPlugins: [ ckeditorAdapterFactory(this.storage) ],
    codeBlock: {
      indentSequence: "\u0009",
      languages: [
          { language: 'javascript', label: 'JavaScript', class: 'js javascript js-code' },
          { language: 'javascript', label: 'TypeScript', class: 'js javascript js-code' }
      ]
  }
}

  constructor(
    private blogService: BlogService,
    public dialog: MatDialog,
    public storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.NewPost();
    this.blogService.GetBlogPosts().subscribe(data => {
      this.currentBlogPosts = data.map(e => {
        let data: any = e.payload.doc.data();
        data.date = data.date.toDate(); // Convert the firestore timestamp object to date object
        return data;
      }) as BlogPost[];
    })
  }

  PostExists(id: string) {
    return this.currentBlogPosts.some(post => post.id === id)
  }

  SelectPost(post: BlogPost) {
    this.formBlogPost = post;
  }

  CreatePost() {
    const dialogRef = this.dialog.open(BlogEditDialog, {
      width: '250px',
      data: {action: "publish", item: this.formBlogPost.title}
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.blogService.CreateBlogPost(this.formBlogPost);
          this.NewPost();
        }
    });
  }

  UpdatePost() {
    const dialogRef = this.dialog.open(BlogEditDialog, {
      width: '250px',
      data: {action: "update", item: this.formBlogPost.title}
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          let currentDate = new Date();
          this.formBlogPost.lastUpdated = firestore.Timestamp.fromDate(currentDate)
          this.blogService.UpdateBlogPost(this.formBlogPost);
          this.NewPost();
        }
    });
  }

  DeletePost() {
    const dialogRef = this.dialog.open(BlogEditDialog, {
      width: '250px',
      data: {action: "delete", item: this.formBlogPost.title}
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
        this.blogService.DeleteBlogPost(this.formBlogPost.id);
        this.NewPost();
        }
    });
  }

  NewPost() {
    this.formBlogPost = {
      title: "",
      body: "",
      id: "",
      date: new Date(),
      authorId: "",
      thumbnailUrl: "",
      thumbnailAlt: ""
    }
  }

  getPhoto(event: any) {
    this.blogService.UploadPhoto(event.target.files[0]).then(e => {
      e.ref.getDownloadURL().then(url => {
        this.formBlogPost.thumbnailUrl = url;
        console.log('the url is: ' + url)
      })
    })
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if(!this.formBlogPost.tags)
        this.formBlogPost.tags = [];
      this.formBlogPost.tags.push(value.trim());
    }
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  removeTag(tag: string): void {
    const index = this.formBlogPost.tags.indexOf(tag);

    if (index >= 0) {
      this.formBlogPost.tags.splice(index, 1);
    }
  }
}
