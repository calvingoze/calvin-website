import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FirebaseStorage } from '@angular/fire';
import { BlogPost } from '../models/BlogPost';
import { AuthService } from '../admin/services/auth/auth.service';
import { User, storage } from 'firebase';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  thumbNailPhoto: any;

  constructor(
    private firestore: AngularFirestore,
    private auth: AuthService,
    private storage: AngularFireStorage
  ) { }

  private GenerateId(): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
      for (let i = 0; i < 20; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    return autoId;
  }

  GetBlogPosts() {
    return this.firestore.collection('blogPosts').snapshotChanges();
  }

  CreateBlogPost(blogPost: BlogPost) {
    let blogId = this.GenerateId();
    let userId = '';
    this.auth.user$.subscribe(user => {
      console.log(user.uid)
      userId = user.uid

      const BlogRef: AngularFirestoreDocument<BlogPost> = this.firestore.doc(`blogPosts/${blogId}`);
  
      const data = { 
        id: blogId, 
        title: blogPost.title, 
        date: blogPost.date, 
        authorId: userId,
        body: blogPost.body,
        thumbnailUrl: blogPost.thumbnailUrl
      }
  
      return BlogRef.set(data, { merge: true })
    })
  }

  UpdateBlogPost(blogPost: BlogPost) {
    this.firestore.doc('blogPosts/' + blogPost.id).update(blogPost);
  }

  DeleteBlogPost(blogPostId: string){
    this.firestore.doc('blogPosts/' + blogPostId).delete();
  }

  async UploadPhoto(file: any) {
    let task: AngularFireUploadTask;
    const path = `images/${Date.now()}_${file.name}`;
    task = this.storage.upload(path, file);
    return task.snapshotChanges().toPromise()
  }

}
