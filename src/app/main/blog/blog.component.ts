import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { BlogPost } from 'src/app/models/BlogPost';
import { Router } from '@angular/router';
import { ListAnimation, SimpleFadeAnimation } from 'src/app/animations/basicAnimations/animations';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  animations: [ListAnimation, SimpleFadeAnimation]
})
export class BlogComponent implements OnInit {

  blogPosts: BlogPost[];
  searchQuery: string;
  searchSubscription: any;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.searchQuery = this.route.snapshot.queryParamMap.get('search');
    if(this.searchQuery) {
      this.advancedQuery();
    } else {
      this.basicQuery();
    }
  }
  
  search(){
    if(this.searchQuery)
    {
      this.router.navigate(['/blog'], {queryParams: { search: this.searchQuery }});
      this.advancedQuery();
    } else {
      this.router.navigate(['/blog']);
      this.basicQuery();
    }
  }

  basicQuery() {
    this.blogPosts = null;
    if(this.searchSubscription)
      this.searchSubscription.unsubscribe();
    this.searchSubscription = this.blogService.GetBlogPosts().subscribe(data => {
      this.blogPosts = data.map(e => {
        let data: any = e.payload.doc.data();
        data.date = data.date.toDate(); // Convert the firestore timestamp object to date object
        return data;
      }) as BlogPost[];

      this.blogPosts.sort((a,b) => b.date.valueOf() - a.date.valueOf());
    });
  }
  advancedQuery() {
    this.blogPosts = null;
    if(this.searchSubscription)
      this.searchSubscription.unsubscribe();
    this.searchSubscription = this.blogService.GetBlogPostsByQuery(this.searchQuery).subscribe(data => {
      this.blogPosts = data.map(e => {
        let data: any = e.payload.doc.data();
        data.date = data.date.toDate(); // Convert the firestore timestamp object to date object
        return data;
      }) as BlogPost[];

      this.blogPosts.sort((a,b) => b.date.valueOf() - a.date.valueOf());
    })
  }
}
