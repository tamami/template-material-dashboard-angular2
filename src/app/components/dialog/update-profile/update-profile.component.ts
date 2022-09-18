import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  email: string
  displayName: string
  docId: string
  user: any

  constructor(public dialogRef: MatDialogRef<UpdateProfileComponent>, @Inject(MAT_DIALOG_DATA) public data: any, 
    private _afAuth: AngularFireAuth, private _userService: UserService) { }

  ngOnInit(): void {
    this._afAuth.user.subscribe({
      next: val => {
        this.email = val.email
        this._userService.getUserByEmail(this.email).subscribe({
          next: val => {
            this.user = val[0] 
            this.docId = this.user.docId
            this.displayName = this.user.displayName
          }
        })
      }
    })
  }

  onCloseClick() {
    this.dialogRef.close()
  }

  onSaveClick() {
    this.user.displayName = this.displayName
    this._userService.update(this.user).then(
      val => {
        // this.user.updateProfile({displayName: this.displayName})
        this.dialogRef.close()
      }
    )
  }
}
