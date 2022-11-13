import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/User';

import { auth, FirebaseError } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BlogPost } from 'src/app/models/BlogPost';

@Injectable({ providedIn: 'root' })
export class AuthService {

    user$: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
    ) { 
      // Get the auth state, then fetch the Firestore user document or return null
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
            // Logged in
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            // Logged out
            return of(null);
          }
        })
      )
    }

    async googleSignin() {
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(
        provider);
      
      this.afs.doc(`users/${credential.user.uid}`).ref.get().then(
        (doc:any) => {
          if(doc.exists) {
            return this.updateUserData(credential.user);
          } else{
            return this.signOut()
          }
        }
      ).catch((data)=> {
        let er = data as FirebaseError
        alert("Login Failed: you don't belong here boy...")
      })

      //return this.updateUserData(credential.user);
    }
  
    private updateUserData(user) {

      this.afs.collection(environment.BlogDataBase, ref => ref.where("authorId","==",user.email)).get().toPromise().then(queryData => {
        let docs = queryData.docs;
        docs.forEach(doc => {
          let blogData = doc.data() as BlogPost;
          blogData.authorName = user.displayName;
          blogData.authorUrl = user.photoURL;
          this.afs.doc(environment.BlogDataBase + '/' + blogData.id).update(blogData)
        });
      });

      // Sets user data to firestore on login
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
      const data = { 
        uid: user.uid, 
        email: user.email, 
        displayName: user.displayName, 
        photoURL: user.photoURL
      }
      return userRef.set(data, { merge: true })
  
    }
  
    async signOut() {
      await this.afAuth.auth.signOut();
      //this.router.navigate(['/']);
    }

}
