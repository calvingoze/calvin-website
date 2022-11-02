import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { BlogPost } from '../models/BlogPost';
import { AuthService } from '../admin/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { take } from 'rxjs/operators';

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

  async CheckifOtherExists(docId: string, prop: string, val: any): Promise<boolean> {
    return this.firestore.collection(environment.BlogDataBase, ref => ref.where(prop, '==', val)).get().toPromise().then(queryData => {
      let newData: any = queryData.docs.filter(doc => doc.data().id != docId);
      return newData.length > 0;
    })
  }

  async CheckifExists(prop: string, val: any): Promise<boolean> {
    return this.firestore.collection(environment.BlogDataBase, ref => ref.where(prop, '==', val)).get().toPromise().then(queryData => {
      return queryData.docs.length > 0;
    })
  }

  GetBlogPosts(getAllPosts: Boolean = false) {
    return this.firestore.collection(environment.BlogDataBase, ref =>{
      if(getAllPosts)
        return ref
      else
        return ref.where('active','==',true)
  }).snapshotChanges();
  }

  GetBlogPostsByQuery(query: string) {
    return this.firestore.collection(environment.BlogDataBase, ref =>
      ref.where('tags','array-contains',query).where('active','==',true)
    ).snapshotChanges();
  }

  async CreateBlogPost(blogPost: BlogPost): Promise<{success: boolean, message: string}> {
    let exists = await this.CheckifExists("friendlyUrlName", blogPost.friendlyUrlName)
    if (exists) {
      return { success: false, message: "A blog post with this URL already exists." };
    }
    else {
      let blogId = this.GenerateId();
      let user = await this.auth.user$.pipe(take(1)).toPromise()
      const BlogRef: AngularFirestoreDocument<BlogPost> = this.firestore.doc(`${environment.BlogDataBase}/${blogId}`);
      blogPost.id = blogId;
      blogPost.authorId = user.email;
      blogPost.authorName = user.displayName;
      blogPost.authorUrl = user.photoURL;
      return await BlogRef.set(blogPost, { merge: true }).then(()=>{
        return { success: true, message: "Blog post published successfully!" };
      }).catch(()=>{
        return { success: false, message: "Unable to publish blog post." };
      });
    }
  }

  async UpdateBlogPost(blogPost: BlogPost): Promise<{success: boolean, message: string}> {
    let exists = await this.CheckifOtherExists(blogPost.id,"friendlyUrlName", blogPost.friendlyUrlName)
    if (exists) {
      return { success: false, message: "A blog post with this URL already exists." };
    } else {
      return await this.firestore.doc(environment.BlogDataBase + '/' + blogPost.id).update(blogPost).then(() => {
        return { success: true, message: "Blog post updated successfully!" };
      }).catch(()=>{
        return { success: false, message: "Unable to update blog post." };
      });
    }
  }

  DeleteBlogPost(blogPostId: string){
    this.firestore.doc(environment.BlogDataBase + '/' + blogPostId).delete();
  }

  async UploadPhoto(file: any) {
    let task: AngularFireUploadTask;
    const path = `images/${Date.now()}_${file.name}`;
    task = this.storage.upload(path, file);
    return task.snapshotChanges().toPromise()
  }

  async GetBlogPost(url: string): Promise<BlogPost> {
    return this.firestore.collection(environment.BlogDataBase, ref => ref.where('friendlyUrlName', '==', url).where('active','==',true)).get().toPromise().then(async queryData => {
      let data: any = queryData.docs[0].data()
      data.date = data.date.toDate(); // Convert the firestore timestamp object to date object
      let blogPost = data as BlogPost;
      return blogPost;
    })
  }

  SubscribeToBlogPost(urlId: string, setPostDelegate: (post: BlogPost) => void) {
    return this.firestore.collection(environment.BlogDataBase, ref => ref.where('friendlyUrlName', '==', urlId).where('active','==',true)).snapshotChanges().subscribe(async queryData => {
      let data: any = queryData[0].payload.doc.data()
      data.date = data.date.toDate(); // Convert the firestore timestamp object to date object
      let blogPost = data as BlogPost;
      setPostDelegate(blogPost);
    })
  }

  async GetAuthorInfo(blogPost): Promise<User> {
    return this.firestore.doc(`users/${blogPost.authorId}`).ref.get().then(data => {
      return data.data() as User
    })
  }
}
