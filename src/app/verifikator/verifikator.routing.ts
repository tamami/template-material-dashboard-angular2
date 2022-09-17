import { Routes } from "@angular/router";
import { AddWorkspaceComponent } from "app/verifikator/add-workspace/add-workspace.component";
import { DashboardComponent } from "app/verifikator/dashboard/dashboard.component";

export const VerifikatorRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'add-workspace', component: AddWorkspaceComponent },
    { path: '', redirectTo: 'dashboard' }
]