import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: string
  pass: string

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    alert('login on LoginComponent')
    this.authService.signIn(this.user,this.pass)
  }

}
