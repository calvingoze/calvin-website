import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { BlogPost } from 'src/app/models/BlogPost';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogPosts: BlogPost[];

  constructor(
    private blogService: BlogService,
    private afs: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.blogService.GetBlogPosts().subscribe(data => {
      this.blogPosts = data.map(e => {
        let data: any = e.payload.doc.data();
        data.date = data.date.toDate(); // Convert the firestore timestamp object to date object
        return data;
      }) as BlogPost[];

      this.blogPosts.forEach(post => {
        this.afs.doc(`users/${post.authorId}`).ref.get().then(doc =>{
         let authorInfo = doc.data() as User;
         post.authorUrl = authorInfo.photoURL
        })
      })
      console.log('san')
    console.log(this.blogPosts[1].date)
    console.log(new Date(Date.now()))
    console.log('san')
    });
  }

  viewDetails(post: BlogPost) {
    this.router.navigate(['/blog', post.id])
  }
}
