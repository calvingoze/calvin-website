import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SkillsComponent } from './main/skills/skills.component';
import { ProjectsComponent } from './main/projects/projects.component';
import { BlogComponent } from './main/blog/blog.component';
import { ContactComponent } from './main/contact/contact.component';
import { HeaderComponent } from './common/header/header.component';
import { SidenavListComponent } from './common/sidenav-list/sidenav-list.component';
import { HomeComponent } from './main/home/home.component';
import { ContentBlockComponent } from './common/content-block/content-block.component';

@NgModule({
  declarations: [
    AppComponent,
    SkillsComponent,
    ProjectsComponent,
    BlogComponent,
    ContactComponent,
    HeaderComponent,
    SidenavListComponent,
    HomeComponent,
    ContentBlockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
