import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [
    LoginComponent, 
    ProjectEditComponent, 
    BlogEditComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ]
})
export class AdminModule { }
