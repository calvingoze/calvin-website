import { COMMA, SPACE} from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/models/BlogPost';
import { BlogService } from 'src/app/services/blog.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogEditDialog } from './blog-edit-modal'
import { MatDialog } from '@angular/material/dialog';
import { firestore } from 'firebase/app';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { ckeditorAdapterFactory } from './CkeditorFirestorageAdapter'
import { AngularFireStorage } from '@angular/fire/storage';
import { title } from 'process';

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
  canEditURL: boolean = false;

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

  ActivePostFilter(post)
  {
    return post.active == true
  }
  InactivePostFilter(post)
  {
    return post.active == false
  }

  ngOnInit(): void {
    this.NewPost();
    this.blogService.GetBlogPosts(true).subscribe(data => {
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
    if (this.formBlogPost.friendlyUrlName != this.formBlogPost.title.replace(/ /gi,"-").toLowerCase().replace(/[^a-z0-9-]/g, ''))
      this.canEditURL = true;
      else
      this.canEditURL = false;
  }

  CreatePost(active: boolean = true) {
    this.formBlogPost.active = active;
    let actionStatment = active ? "publish" : "save";
    this.formBlogPost.friendlyUrlName = this.formBlogPost.friendlyUrlName.replace(/ /gi,"-").toLowerCase().replace(/[^a-z0-9-]/g, '')
    const dialogRef = this.dialog.open(BlogEditDialog, {
      width: '250px',
      data: {action: actionStatment, item: this.formBlogPost.title}
    });

    dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          let result = await this.blogService.CreateBlogPost(this.formBlogPost);
          if (result.success) {
            this.NewPost();
          } else {
            alert(result.message);
          }
        }
    });
  }

  UpdatePost(changeActivity: boolean = false) {
    this.formBlogPost.friendlyUrlName = this.formBlogPost.friendlyUrlName.replace(/ /gi,"-").toLowerCase().replace(/[^a-z0-9-]/g, '')
    let actionStatment = changeActivity && this.formBlogPost.active ? "save and deactivate" : changeActivity && !this.formBlogPost.active ? "save and activate" : "update"
    const dialogRef = this.dialog.open(BlogEditDialog, {
      width: '250px',
      data: { action: actionStatment, item: this.formBlogPost.title }
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        if(changeActivity)
        this.formBlogPost.active = !this.formBlogPost.active;
        let currentDate = new Date();
        this.formBlogPost.lastUpdated = firestore.Timestamp.fromDate(currentDate)
        let result = await this.blogService.UpdateBlogPost(this.formBlogPost);
        if(result.success) {
          this.NewPost();
        } else {
          alert(result.message)
        }
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
    this.canEditURL = false;
    this.formBlogPost = {
      title: "",
      body: "",
      id: "",
      date: new Date(),
      authorId: "",
      thumbnailUrl: "",
      thumbnailAlt: "",
      active: true
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

  UpdateFriendlyUrl() {
    if(!this.canEditURL)
    {
      this.formBlogPost.friendlyUrlName = this.formBlogPost.title.replace(/ /gi,"-").toLowerCase().replace(/[^a-z0-9-]/g, '');
    }
  }

  ToggleURLEditor() {
    this.canEditURL = !this.canEditURL;
    if (!this.canEditURL)
      this.UpdateFriendlyUrl();
  }
}
