import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin/projects', component: ProjectEditComponent, canActivate: [AuthGuard] },
  { path: 'admin/blog', component: BlogEditComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
