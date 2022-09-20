import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from "@angular/router";
import { AdminRoutes } from "./admin.routing";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserConfigComponent } from "./user-config/user-config.component";
import { AddUserComponent } from './add-user/add-user.component';
import { AngularMaterialModule } from "app/angular-material.module";
import { UpdateUserComponent } from './update-user/update-user.component';
import { WorkspacesComponent } from './workspaces/workspaces.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(AdminRoutes), 
        FormsModule, 
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        AngularMaterialModule,
    ],
    declarations: [
        DashboardComponent,
        UserConfigComponent,
        AddUserComponent,
        UpdateUserComponent,
        WorkspacesComponent,
        ConfirmDialogComponent
    ]
})
export class AdminModule {}