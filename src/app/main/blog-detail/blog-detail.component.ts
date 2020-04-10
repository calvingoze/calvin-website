import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BlogPost } from 'src/app/models/BlogPost';
import { ActivatedRoute } from '@angular/router';
import { User } from 'firebase';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  blogPost: BlogPost

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit(): void {
     this.afs.doc(`blogPosts/${this.route.snapshot.params['id']}`).ref.get().then(doc =>{
      let data: any = doc.data();
      data.date = data.date.toDate(); // Convert the firestore timestamp object to date object
      this.blogPost = data;
      this.titleService.setTitle(this.blogPost.title);
      this.afs.doc(`users/${this.blogPost.authorId}`).ref.get().then(doc => {
        let authorInfo = doc.data() as User;
        this.blogPost.authorUrl = authorInfo.photoURL;
        this.blogPost.authorName = authorInfo.displayName;
      })
     })
  }

}
