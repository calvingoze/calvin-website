import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  sendMessage(name, email, message) {
    const messageRef: AngularFirestoreDocument<Object> = this.firestore.doc(`contactMessages/${Date.now()}_${email}`);
    const data = {
      email: email,
      name: name,
      message: message,
      date: firestore.Timestamp.fromDate(new Date())
    }
      return messageRef.set(data)
  }
}
