import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private afs: AngularFirestore) { }

  getAllRoles(): Observable<any> {
    return this.afs.collection('roles').valueChanges();
  }
}
