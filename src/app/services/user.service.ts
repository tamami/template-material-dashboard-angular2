import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) { }


  getRole(user: any): Observable<any> {
    return this.afs.collection('users', ref => {
      return ref.where('email','==',user.email);
    }).valueChanges()
  }

  getUserByEmail(email: string): Observable<any> {
    return this.afs.collection('users', ref => {
      return ref.where('email','==',email);
    }).valueChanges()
  }

  getByRole(role: string): Observable<any> {
    return this.afs.collection('users', ref => {
      return ref.where('role', '==', role);
    }).valueChanges()
  }

  getAllUsers(): Observable<any> {
    return this.afs.collection('users').valueChanges().pipe(take(1));
  }

  update(user: any): Promise<void> {
    // console.log(user);
    // console.log(`${user.uid}`);
    return this.afs.doc<any>(`users/${user.uid}`).update(user);
  }

}
