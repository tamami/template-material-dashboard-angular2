import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { WorkspacesService } from 'app/services/workspaces.service';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { DetailDialogComponent } from '../dialog/detail-dialog/detail-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [ 'tglUnggah', 'workspaceName', 'petugas', 'draft', 'opsi' ]
  dataSource: MatTableDataSource<any>
  jmlBerkasTerunggah = 0
  jmlBerkasTerverifikasi = 0
  userData: any

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(private _workspaceService: WorkspacesService, private _snackbar: MatSnackBar, private _router: Router, 
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initData()
  }

  initData() {
    this._workspaceService.getAll().subscribe({
      next: val => {
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
        this._snackbar.open(e, 'Error', { duration: 3000 })
      }
    })
    this._workspaceService.getAllVerifiedData().subscribe({
      next: val => {
        this.jmlBerkasTerverifikasi = val.length
      }
    })
  }

  hapus(docId) {
    this._workspaceService.getDocByDocId(docId).subscribe({
      next: val => {
        console.log(val)
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '300px',
          data: { workspaceName: val.workspaceName }
        })
        dialogRef.afterClosed().subscribe({
          next: val => {
            if(val) {
              this._workspaceService.deleteWorkspaceById(docId).then(val => {
                this._snackbar.open('Data telah terhapus', 'Info', { duration: 3000 })
              })
            } 
          }
        })
      }, 
      error: e => {
        this._snackbar.open(e, 'Kesalahan', { duration: 3000 })
      } 
    })
  }

  search(evt) {
    const filterValue = (evt.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  verifikasi(docId) {
    this._workspaceService.setVerified(docId).then(val => {
      // this._router.navigate(['/verifikator'])
      this._snackbar.open('Datanya telah diverifikasi', 'Info', { duration: 3000 })
    })
  }

  detail(docId) {
    const dialogRef = this.dialog.open(DetailDialogComponent, {
      width: '80%', height: '80%', 
      data: { docId: docId }
    })
  }

}
