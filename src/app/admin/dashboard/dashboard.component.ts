import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  jumlahAdmin: 0
  jumlahSurveyor: 0
  jumlahVerifikator: 0

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this._userService.getByRole('admin').subscribe(
      resp => {
        this.jumlahAdmin = resp.length
      }
    )
    this._userService.getByRole('surveyor').subscribe(
      resp => {
        this.jumlahSurveyor = resp.length
      }
    )
    this._userService.getByRole('verifikator').subscribe(
      resp => {
        this.jumlahVerifikator = resp.length
      }
    )
  }

}
