import { Routes } from "@angular/router";
import { AddWorkspaceComponent } from "./add-workspace/add-workspace.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

export const SurveyorRoutes: Routes = [ 
    { path: 'dashboard', component: DashboardComponent },
    { path: 'add-workspace', component: AddWorkspaceComponent },
    { path: '', redirectTo: 'dashboard' },
]