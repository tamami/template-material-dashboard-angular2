import { Routes } from "@angular/router";
import { AddUserComponent } from "./add-user/add-user.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UpdateUserComponent } from "./update-user/update-user.component";
import { UserConfigComponent } from "./user-config/user-config.component";
import { WorkspacesComponent } from "./workspaces/workspaces.component"

export const AdminRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-config', component: UserConfigComponent },
    { path: 'add-user', component: AddUserComponent },
    { path: 'update-user', component: UpdateUserComponent },
    { path: 'workspaces', component: WorkspacesComponent },
    { path: '', redirectTo: 'dashboard' },
];