import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import * as auth from 'firebase/auth';
import { User } from 'app/model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth, public router: Router, public ngZone: NgZone,
    private _snackbar: MatSnackBar, private userService: UserService) {
      this.afAuth.languageCode = new Promise(() => "id" );
      this.afAuth.authState.subscribe((user) => {
        if(user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user')!);
        } else {
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user')!);
        }
      });
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      if(!this.isExists(result.user)) {
        this.setUserData(result.user);
      } 
      this.afAuth.authState.subscribe((user) => {
        if(user) {
          var role = this.getRole(user);
          this.userService.getRole(user).subscribe(
            resp => {
              switch(resp[0].role) {
                case 'admin': {
                  this.router.navigate(['admin']);
                  break;
                }
                default: {
                  this.router.navigate(['welcome']);
                  break;
                }
              }
            }
          );
        }
      });
    })
    .catch((error) => {
      this._snackbar.open(error.message);
      // window.alert(error.message);
    });
  }

  signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      console.log('selesai signUp');
      this.sendVerificationMail();
      this.setUserData(result.user);
    })
    .catch((error) => {
      console.log(error);
      this._snackbar.open(error.message, 'info', { duration: 3000 });
    });
  }

  sendVerificationMail() {
    return this.afAuth.currentUser
    .then((u: any) => u.sendEmailVerification())
    .then(() => {
      this.router.navigate(['verify-email-address']);
    });
  }

  forgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      this._snackbar.open('Password reset email terkirim, periksa kotak masuk');
      // window.alert('Password reset email terkirim, periksa inbox');
    })
    .catch((error) => {
      this._snackbar.open(error.message);
      // window.alert(error.message);
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider())
    .then((res: any) => {
      this.router.navigate(['welcome']);
    })
  }

  authLogin(provider: any) {
    return this.afAuth
    .signInWithPopup(provider)
    .then((result) => {
      this.router.navigate(['welcome']);
      this.userData = result.user;
    })
    .catch((error) => {
      this._snackbar.open(error);
      // window.alert(error);
    })
  }

  getRole(user: any): string {
    this.userService.getRole(user).subscribe(
      resp => {
        console.log(resp[0].role);
        return resp[0].role;
      }
    )
    return "";
  }

  async isExists(user: any): Promise<boolean> {
    await this.userService.getUserByEmail(user.email).subscribe(
      resp => {
        console.debug(resp);
        if(resp.length > 0) return true
        else return false
      }
    )
    return false;
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      role: ''
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  signOut() {
    return this.afAuth.signOut()
    .then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    })
  }

  updateUser(user) {
    console.log(user);
    this.afAuth.updateCurrentUser(user).then(
      () => {
        this.router.navigate(['/welcome']);
      }
    );
  }
}