import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { WorkspacesService } from 'app/services/workspaces.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = []
  dataSource: MatTableDataSource<any>

  constructor(private _workspacesService: WorkspacesService, private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    var email = JSON.parse(sessionStorage.getItem('userData')).email
    this._workspacesService.getByEmail(email).subscribe(
      resp => {
        console.log(resp)
      }, 
      err => {
        this._snackbar.open(err, 'Error', { duration: 3000 })
      }
    )
  }

}
