import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, DocumentReference, Query } from '@angular/fire/compat/firestore';
import { environment } from 'environments/environment';
import { connect, model, Schema } from 'mongoose';
import { BehaviorSubject, combineLatest, forkJoin, Observable, switchMap, take } from 'rxjs';
import { Workspace } from '../model/workspace';

@Injectable({
  providedIn: 'root'
})
export class WorkspacesService {
  items$: Observable<any>
  petugasFilter$: BehaviorSubject<string>
  verifikasiFilter$: BehaviorSubject<boolean>

  constructor(private afs: AngularFirestore) { }

  save(data: any): Promise<DocumentReference> { 
    console.log(data)
    return this.afs.collection('workspace').add(data)
  }

  getByEmail(email: string): Observable<any> {
    return this.afs.collection('workspace', ref => ref.where('user','==',email)).valueChanges({ idField: 'docId' })
  }

  getAll(): Observable<any> {
    return this.afs.collection('workspace').valueChanges({ idField: 'docId'})
  }

  getAllVerifiedData(): Observable<any> {
    return this.afs.collection('workspace', ref => ref.where('draft', '==', false)).valueChanges({idField: 'docId' })
  }

  getByPetugasAndVerified(petugas: string): Observable<any> {
    this.petugasFilter$ = new BehaviorSubject(petugas)
    this.verifikasiFilter$ = new BehaviorSubject(true)
    this.items$ = forkJoin([
      this.petugasFilter$, this.verifikasiFilter$
    ]).pipe(
      switchMap(([petugas, verifikasi]) => this.afs.collection('workspace', ref => {
        var query: CollectionReference | Query = ref
        if(petugas) { query = query.where('petugas', '==', petugas) }
        if(verifikasi) { query = query.where('draft', '==', verifikasi) }
        return query
      }).valueChanges({ idField: 'docId' }))
    )
    return this.items$
  }

  deleteWorkspaceById(docId: string): Promise<any> {
    return this.afs.doc(`workspace/${docId}`).delete()
  }

  setVerified(docId: string): Promise<void> {
    return this.afs.doc(`workspace/${docId}`).update({draft: false})
  }

  getDocByDocId(docId: string): Observable<any> {
    return this.afs.doc(`workspace/${docId}`).valueChanges().pipe(take(1))
  }

}
