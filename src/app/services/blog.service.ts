import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { BlogPost } from '../models/BlogPost';
import { AuthService } from '../admin/services/auth/auth.service';

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

  GetBlogPostsByQuery(query: string) {
    return this.firestore.collection('blogPosts', ref =>
      ref.where('tags','array-contains',query)
    ).snapshotChanges();
  }

  CreateBlogPost(blogPost: BlogPost) {
    let blogId = this.GenerateId();
    let userId = '';
    this.auth.user$.subscribe(user => {
      console.log(user.uid)
      userId = user.uid

      const BlogRef: AngularFirestoreDocument<BlogPost> = this.firestore.doc(`blogPosts/${blogId}`);
  
      blogPost.id = blogId;
      blogPost.authorId = userId;
  
      return BlogRef.set(blogPost, { merge: true })
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
