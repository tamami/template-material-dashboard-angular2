import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { environment } from 'environments/environment';
import { connect, model, Schema } from 'mongoose';
import { Observable } from 'rxjs';
import { Workspace } from '../model/workspace';

@Injectable({
  providedIn: 'root'
})
export class WorkspacesService {

  constructor(private afs: AngularFirestore) { }

  save(data: any): Promise<DocumentReference> { 
    console.log(data)
    return this.afs.collection('workspace').add(data)
  }

  getByEmail(email: string): Observable<any> {
    return this.afs.collection('workspace', ref => ref.where('user','==',email)).valueChanges()
  }
}
