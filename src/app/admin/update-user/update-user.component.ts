import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/model/user';
import { RoleService } from 'app/services/role.service';
import { UserService } from 'app/services/user.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit, AfterViewInit {
  displayName: string = "";
  email: string;
  password: string;
  emailVerified: boolean;
  role: string;
  uid: string;
  statusTerverifikasi: string;
  roles: any[];
  user: any;

  constructor(private route: ActivatedRoute, private _snackbar: MatSnackBar, private _afs: AngularFirestore, 
    private _roleService: RoleService, private _authService: AuthService, private _userService: UserService, 
    private router: Router) { }

  ngOnInit(): void {
    this._roleService.getAllRoles().subscribe(
      resp => {
        this.roles = resp;
      }
    )

    this.user = JSON.parse(sessionStorage.getItem('data'));
    console.log(this.user);
    // this.initData().then(
    //   val => {
    //     this.user = val;
    //   }
    // )
  }

  initData() {
    return new Promise<any>((_resolve, _reject) => { 
      var data = JSON.parse(sessionStorage.getItem('data'));
      sessionStorage.removeItem('data');
      // this.uid = data.uid;
      // this.displayName = data.displayName;
      // this.email = data.email;
      // this.emailVerified = data.emailVerified;
      // this.role = data.role;
      _resolve(data);
    });
  }

  ngAfterViewInit(): void {
    
  }

  emailVerifiedClick() {
    if(this.emailVerified) {
      this.emailVerified = false;
      this.statusTerverifikasi = 'BELUM';
    } else {
      this.emailVerified = true;
      this.statusTerverifikasi = "SUDAH";
    }
  }

  setDisplayName(evt) {
    console.log(evt);
  }

  save() {
    console.log(this.user);
    this._userService.update(this.user).finally(
      () => {
        sessionStorage.setItem('user', this.user);
        this.router.navigate(['admin/user-config']);  
      }
    );
    // this._authService.updateUser(this.user);

  }

}
