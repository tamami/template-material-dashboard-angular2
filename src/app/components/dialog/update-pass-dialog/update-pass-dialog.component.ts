import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-pass-dialog',
  templateUrl: './update-pass-dialog.component.html',
  styleUrls: ['./update-pass-dialog.component.scss']
})
export class UpdatePassDialogComponent implements OnInit {
  password: string
  user: any

  constructor(public dialogRef: MatDialogRef<UpdatePassDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, 
    private _afAuth: AngularFireAuth) { }

  ngOnInit(): void {}

  save() {
    this._afAuth.currentUser.then(
      val => {
        val.updatePassword(this.password).then(
          val => {
            this.dialogRef.close()
          }
        ).catch(
          e => {
            console.log(e)
            this.dialogRef.close()
          }
        )
      }
    )
  }

}
