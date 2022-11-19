import { Component, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/models/BlogPost';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { SlideinAnimation, SimpleFadeAnimation } from 'src/app/animations/basicAnimations/animations';
import { BlogService } from 'src/app/services/blog.service';
import { User } from 'src/app/models/User';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
  animations: [ SlideinAnimation, SimpleFadeAnimation ]
})
export class BlogDetailComponent implements OnInit {

  blogPost: BlogPost

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit(): void {

    let SetPost = (post: BlogPost): void => {

      if (post.tags && post.tags.length > 0) {
        let keyWordString = ""
        post.tags.forEach((tag) => {
          keyWordString += tag + ", "
        })
        keyWordString = keyWordString.substring(0, keyWordString.length - 2);
        this.metaService.updateTag({name:"keywords",content:keyWordString})
      } else {
        this.metaService.removeTag("name='keywords'")
      }
      
      this.blogPost = post;
      this.titleService.setTitle(this.blogPost.title);
      this.metaService.updateTag({name:"title",content:this.blogPost.title})
      this.metaService.updateTag({property:"og:title",content:this.blogPost.title})
      this.metaService.updateTag({property:"twitter:title",content:this.blogPost.title})
      this.metaService.updateTag({property:"og:image",content:this.blogPost.thumbnailUrl})
      this.metaService.updateTag({property:"twitter:image",content:this.blogPost.thumbnailUrl})

      this.metaService.removeTag("name='description'")
    }

    this.blogService.SubscribeToBlogPost(this.route.snapshot.params['id'],SetPost);
  }

}
