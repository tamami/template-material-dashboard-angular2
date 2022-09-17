import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SurveyorRoutes } from "./surveyor.routing";
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddWorkspaceComponent } from './add-workspace/add-workspace.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AngularMaterialModule } from "app/angular-material.module";
import { MatTableModule } from "@angular/material/table";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SurveyorRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule, 
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule, 
        AngularMaterialModule,
        MatTableModule,
    ],
    declarations: [
      DashboardComponent,
      AddWorkspaceComponent
    ]
})
export class SurveyorModule {}