import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { WorkspacesService } from 'app/services/workspaces.service';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { saveAs } from 'file-saver'
import { HttpClient } from '@angular/common/http';
import { DetailDialogComponent } from 'app/verifikator/dialog/detail-dialog/detail-dialog.component';



@Component({
  selector: 'app-workspaces',
  templateUrl: './workspaces.component.html',
  styleUrls: ['./workspaces.component.scss']
})
export class WorkspacesComponent implements OnInit {
  displayedColumns: string[] = [ 'tglUnggah', 'workspaceName', 'petugas', 'opsi' ]
  dataSource: MatTableDataSource<any>
  jmlBerkasTerunggah = 0
  jmlBerkasTerverifikasi = 0
  userData: any
  shpwrite = require('shp-write')

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(private _workspaceService: WorkspacesService, private _snackbar: MatSnackBar, private _router: Router, 
    public dialog: MatDialog, private _http: HttpClient) { }

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
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '300px', 
          data: { workspaceName: val.workspaceName }
        })
        dialogRef.afterClosed().subscribe({
          next: val => {
            if(val) {
              this._workspaceService.deleteWorkspaceById(docId).then(
                val => {
                  this._snackbar.open('Data telah terhapus', 'Info', { duration: 3000 })
                }
              )
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

  detail(docId) {
    const dialogRef = this.dialog.open(DetailDialogComponent, {
      width: '80%', height: '80%', 
      data: { docId: docId }
    })
  }

  exportAttributeToCsv(docId) {
    this._workspaceService.getDocByDocId(docId).subscribe({
      next: val => {
        var spatialData = JSON.parse(val.spatialData)
        var features = spatialData.features
        console.log(features)
        var props = features.map(
          val => val.properties
        )
        console.log(props)
        this.exportCsvFile(props)
      }
    })
  }

  exportCsvFile(features) {
    const replacer = (key,val) => val === null ? '' : val
    const header = Object.keys(features[0])
    let csv = features.map(
      row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(',')
    )
    csv.unshift(header.join(','))
    let csvArray = csv.join('\r\n')
    var blob = new Blob([csvArray], { type: 'text/csv' })
    saveAs(blob, 'exported.csv')
  }

  exportShp(docId) {
    this._workspaceService.getDocByDocId(docId).subscribe({
      next: val => {
        var spatialData = JSON.parse(val.spatialData)
        console.log(spatialData)
        var options = {
          folder: 'hasil', 
          types: {
            point: 'titik', 
            polygon: 'bidang', 
            line: 'garis'
          }
        }
        this._workspaceService.getShp(val.spatialData).subscribe({
          next: val => {
            var newBlob = new Blob([val], { type: "application/zip"})
            const data = window.URL.createObjectURL(newBlob)
            var link = document.createElement('a')
            link.href = data
            link.download = 'content.shz'
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
            setTimeout(() => {
              window.URL.revokeObjectURL(data)
              link.remove()
            }, 100)
          }, 
          error: e => {
            console.log(e)
          }
        })
        // shpwrite.download(spatialData, options)
        // this._http.post('http://ogre.adc4gis.com/convertJson', { json: JSON.stringify(spatialData) }).subscribe({
        //   next: val => {
        //     console.log(val)
        //     // var blob = new Blob([val], { type: 'application/shz' })
        //     // saveAs(blob, 'exported.shz')
        //   }
        // })
      }
    })
  }


}
