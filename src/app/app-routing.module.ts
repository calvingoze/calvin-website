import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule, ActivatedRoute, NavigationEnd } from '@angular/router';
import {HomeComponent} from './main/home/home.component';
import {ContactComponent} from './main/contact/contact.component';
import {ProjectsComponent} from './main/projects/projects.component';
import {BlogComponent} from './main/blog/blog.component';
import { BlogDetailComponent } from './main/blog-detail/blog-detail.component';
import { Meta, Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: "Calvin Gozé",
      description: "My name is Calvin Gozé. I'm an engineering student, and a self taught software developer. "+
      "I have a passion for invention, science, and learning all that I can."
    }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {
      title: "Calvin Gozé | Contact",
      description: "I'd love to get in contact with you! Feel free to ask me anything!"
    }
  },
  {
    path: 'blog',
    component: BlogComponent,
    data: {
      title: 'Calvin Gozé | Blog',
      description: "This is my blog, where I talk about engineering stuff, interesting thins's I've done, or just about anything that's on my mind!"
    }
  },
  {path: 'blog/:id', component: BlogDetailComponent}
  //{path: 'projects', component: ProjectsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(
    private titleService: Title,
    private meta: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.router.events
      .pipe(
          filter((event) => event instanceof NavigationEnd),
          map(() => this.activatedRoute),
          map((route) => {
              while (route.firstChild) { route = route.firstChild; }
              return route;
          }),
          filter((route) => route.outlet === 'primary'),
          mergeMap((route) => route.data)).subscribe((event) => {
              this.titleService.setTitle(event['title']);
              this.meta.updateTag({name: 'description',content: event['description']})
              this.meta.updateTag({name:"title",content: event['title']})
              this.meta.updateTag({property:"og:title",content: event['title']})
              this.meta.updateTag({property:"twitter:title",content: event['title']})
              this.meta.updateTag({property:"og:image",content:"https://firebasestorage.googleapis.com/v0/b/calvinwebsite-7228e.appspot.com/o/Static_Images%2Fhome-hero-mobile.jpg?alt=media&token=7fbdbd08-6420-44c4-b371-cdcfc2e7662a"})
              this.meta.updateTag({property:"twitter:image",content:"https://firebasestorage.googleapis.com/v0/b/calvinwebsite-7228e.appspot.com/o/Static_Images%2Fhome-hero-mobile.jpg?alt=media&token=7fbdbd08-6420-44c4-b371-cdcfc2e7662a"})
              this.meta.removeTag("name='keywords'")
          });
  }
 }
