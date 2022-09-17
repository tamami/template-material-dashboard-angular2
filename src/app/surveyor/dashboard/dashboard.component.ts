import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WorkspacesService } from 'app/services/workspaces.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['tglUnggah' , 'workspaceName', 'petugas', 'draft', 'opsi']
  dataSource: MatTableDataSource<any>
  jmlBerkasTerunggah = 0
  jmlBerkasTerverifikasi = 0
  userData: any;

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(private _workspacesService: WorkspacesService, private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.userData = JSON.parse(sessionStorage.getItem('userData'))
    if(this.userData.role === 'surveyor') {
      this.initForSurveyor()
    } else if(this.userData.role === 'verifikator') {
      this.initForVerifikator()
    }
    
  }

  ngAfterViewInit(): void {
    
  }

  search(evt) {
    const filterValue = (evt.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  hapus(docId) {
    this._snackbar.open('hapus id ' + docId, 'Info', {duration: 3000})
    this._workspacesService.deleteWorkspaceById(docId).then( val => {
      this._snackbar.open('Data telah terhapus', 'Info', {duration: 3000})
    })
  }

  initForSurveyor() {
    var email = this.userData.email
    this._workspacesService.getByEmail(email).subscribe({
      next: (resp) => {
        this.jmlBerkasTerunggah = resp.length
        var dataForDs = resp.map(val => {
          delete val.user
          delete val.spatialData
          val.draft = val.draft ? 'BELUM' : 'SUDAH'
          return val
        })
        this.dataSource = new MatTableDataSource(dataForDs)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      }, 
      error: (e) => {
        this._snackbar.open(e, 'Error', { duration: 3000 })
      },
      complete: () => {}
    })
    this._workspacesService.getByPetugasAndVerified(email).subscribe({
      next: (val) => {
        this.jmlBerkasTerverifikasi = val.length
      }
    })
  }

  initForVerifikator() {
    this._workspacesService.getAll().subscribe({
      next: (val) => {
        this.jmlBerkasTerunggah = val.length
        var dataForDs = val.map(data => {
          delete data.user
          delete data.spatialData
          data.draft = data.draft ? 'BELUM' : 'SUDAH'
          return data
        })
        this.dataSource = new MatTableDataSource(dataForDs)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error: e => {
        this._snackbar.open(e, 'Error', {duration: 3000})
      }
    })
    this._workspacesService.getAllVerifiedData().subscribe({
      next: val => {
        this.jmlBerkasTerverifikasi = val.length
      }
    })
  }

}
