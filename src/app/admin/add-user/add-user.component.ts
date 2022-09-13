import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { RoleService } from 'app/services/role.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  roles: any[];
  email: string;
  password: string;
  role: string;

  constructor(private roleService: RoleService, private authService: AuthService, private _snackbar: MatSnackBar,
    private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe(
      resp => {
        this.roles = resp;
      }
    )
  }

  register() {
    let data = {
      email: this.email,
      password: this.password,
      role: this.role
    };
    this.authService.signUp(this.email, this.password);
  }

}
