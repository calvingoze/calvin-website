import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './main/home/home.component';
import {ContactComponent} from './main/contact/contact.component';
import {ProjectsComponent} from './main/projects/projects.component';
import {BlogComponent} from './main/blog/blog.component';
import { BlogDetailComponent } from './main/blog-detail/blog-detail.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'contact', component: ContactComponent},
  //{path: 'projects', component: ProjectsComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'blog/:id', component: BlogDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
