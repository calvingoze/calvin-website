import { Component, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/models/BlogPost';
import { BlogService } from 'src/app/services/blog.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { firestore } from 'firebase';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {

  formBlogPost: BlogPost;
  currentBlogPosts: BlogPost[];

  public Editor = ClassicEditor;

  constructor(
    private blogService: BlogService
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
    this.Editor.config.height = 500;
  }

  PostExists(id: string) {
    return this.currentBlogPosts.some(post => post.id === id)
  }

  SelectPost(post: BlogPost) {
    this.formBlogPost = post;
  }

  CreatePost() {
    this.blogService.CreateBlogPost(this.formBlogPost);
  }

  UpdatePost() {
    this.blogService.UpdateBlogPost(this.formBlogPost);
  }

  DeletePost() {
    this.blogService.DeleteBlogPost(this.formBlogPost.id);
    this.NewPost();
  }

  NewPost() {
    let currenDate = new Date();
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


}
