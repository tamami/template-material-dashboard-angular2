import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { AngularMaterialModule } from "app/angular-material.module";
import { AddWorkspaceComponent } from "app/verifikator/add-workspace/add-workspace.component";
import { DashboardComponent } from "app/verifikator/dashboard/dashboard.component";
import { VerifikatorRoutes } from "./verifikator.routing";
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { DetailDialogComponent } from './dialog/detail-dialog/detail-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(VerifikatorRoutes), 
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        AngularMaterialModule,
        MatTableModule
    ], 
    declarations: [
        DashboardComponent,
        AddWorkspaceComponent,
        ConfirmDialogComponent,
        DetailDialogComponent
    ]
})
export class VerifikatorModule {}