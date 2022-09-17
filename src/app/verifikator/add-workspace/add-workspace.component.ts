import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WorkspacesService } from 'app/services/workspaces.service';
import * as L from 'leaflet';
import * as turf from '@turf/turf'
import * as moment from 'moment';

@Component({
  selector: 'app-add-workspace',
  templateUrl: './add-workspace.component.html',
  styleUrls: ['./add-workspace.component.scss']
})
export class AddWorkspaceComponent implements OnInit, AfterViewInit {
  map: L.Map
  workspaceName: string
  spatialData: any
  surveyor: string
  
  constructor(private _workspaceService: WorkspacesService, private _snackbar: MatSnackBar, private _router: Router) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.map = L.map('map', { zoom: 10 })
    var openStreetLayer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    openStreetLayer.addTo(this.map)
  }

  fileChange(evt) {
    var file = evt.target.files[0]
    var fileReader = new FileReader()
    fileReader.onload = e => {
      var objResult = JSON.parse(fileReader.result.toString())
      delete objResult.crs;
      delete objResult.name
      this.spatialData = objResult
      var geoJSONgroup = L.geoJSON(objResult, { onEachFeature: this.getPropertiesOnEachFeature }).addTo(this.map)
      this.map.fitBounds(geoJSONgroup.getBounds())
    }
    fileReader.readAsText(file)
  }

  getPropertiesOnEachFeature(feature, layer) {
    var content = "<table>" +
      "<tr>" +
      "<td>Alamat OP</td><td>:</td>" +
      "<td>" + feature.properties['Alamat OP'] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Alamat WP</td><td>:</td>" +
      "<td>" + feature.properties['Alamat WP'] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Attachment</td><td>:</td>" +
      "<td>" + feature.properties['Attachment'] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Daya Listrik</td><td>:</td>" +
      "<td>" + feature.properties["Daya Listr"] + "</td>" +
      "</tr>" +
      "<tr>" + 
      "<td>Jenis Bumi</td><td>:</td>" +
      "<td>" + feature.properties["Jenis Bumi"] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Jenis Transaksi</td><td>:</td>" +
      "<td>" + feature.properties["Jenis Tr_1"] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Jenis Transaksi 1</td><td>:</td>" +
      "<td>" + feature.properties["Jenis Tran"] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Jumlah AC</td><td>:</td>" +
      "<td>" + feature.properties["Jumlah AC"] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Jumlah Lantai</td><td>:</td>" +
      "<td>" + feature.properties["Jumlah Lan"] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Kabupaten</td><td>:</td>" +
      "<td>" + feature.properties["Kabupaten "] + "</td>" +
      "</tr>" +
      "<tr>" + 
      "<td>Kelurahan</td><td>:</td>" +
      "<td>" + feature.properties["Kelurahan/"] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Kelurahan 1</td><td>:</td>" +
      "<td>" + feature.properties['Keluraha_1'] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Keterangan</td><td>:</td>" +
      "<td>" + feature.properties['Keterangan'] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Kondisi Bangunan</td><td>:</td>" +
      "<td>" + feature.properties['Kondisi Ba'] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Luas Tanah Auto</td><td>:</td>" +
      "<td>" + feature.properties['LT Auto'] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Luas Bangunan</td><td>:</td>" +
      "<td>" + feature.properties['Luas Bangu'] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Luas Tanah</td><td>:</td>" +
      "<td>" + feature.properties['Luas Tanah'] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>NOP</td><td>:</td>" +
      "<td>" + feature.properties['NOP'] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>NOP Induk</td><td>:</td>" +
      "<td>" + feature.properties['NOP Induk'] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Nama Subjek Pajak</td><td>:</td>" +
      "<td>" + feature.properties['Nama Subje'] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Nomor Formulir</td><td>:</td>" +
      "<td>" + feature.properties['No Formuli'] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>No KTP</td><td>:</td>" +
      "<td>" + feature.properties['No KTP'] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Pekerjaan</td><td>:</td>" +
      "<td>" + feature.properties['Pekerjaan'] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>RT/RW OP</td><td>:</td>" +
      "<td>" + feature.properties['RT - RW OP'] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>RT/RW WP</td><td>:</td>" +
      "<td>" + feature.properties['RT - RW WP'] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Status Subjek Pajak</td><td>:</td>" +
      "<td>" + feature.properties['Status Sub'] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Tahun Di Bangun</td><td>:</td>" +
      "<td>" + feature.properties['Tahun Di B'] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Tahun Renovasi</td><td>:</td>" +
      "<td>" + feature.properties['Tahun Reno'] + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>ZNT</td><td>:</td>" +
      "<td>" + feature.properties['ZNT'] + "</td>" +
      "</tr>" +
      "</table>"
    layer.bindPopup(content, { closeButton: false })
  }

  save() {
    var email = JSON.parse(sessionStorage.getItem('userData')).email
    var data = {
      workspaceName: this.workspaceName,
      user: email,
      petugas: this.surveyor,
      draft: true,
      tglUnggah: moment().format('YYYY-MM-DD'),
      spatialData: JSON.stringify(this.spatialData)
    }
    this._workspaceService.save(data)
    this._router.navigate(['/verifikator'])
  }

}
