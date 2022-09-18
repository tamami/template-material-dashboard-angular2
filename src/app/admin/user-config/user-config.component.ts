import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit {
  users: any[];

  constructor(private userService: UserService, private _snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      resp => {
        console.log(resp);
        this.users = resp;
      }
    )
  }

  ubahClick(data: any) {
    // this._snackbar.open(uid, 'info', { duration: 3000 });
    sessionStorage.setItem('data', JSON.stringify(data));
    this.router.navigate(['/admin/update-user']);
  }

}
