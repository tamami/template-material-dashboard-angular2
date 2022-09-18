import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard'

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdminComponent } from './admin/admin.component';
import { UpdateUserComponent } from './welcome/update-user/update-user.component';
import { SurveyorComponent } from './surveyor/surveyor.component';
import { VerifikatorComponent } from './verifikator/verifikator.component';

const routes: Routes =[
  { path: '', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'update-user', component: UpdateUserComponent, canActivate: [ AngularFireAuthGuard ] },
  { path: 'admin', component: AdminComponent, canActivate: [ AngularFireAuthGuard ], children: [
    {
      path: '',
      loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    }
  ]},
  { path: 'surveyor', component: SurveyorComponent, canActivate: [ AngularFireAuthGuard ], children: [
    {
      path: '',
      loadChildren: () => import('./surveyor/surveyor.module').then(m => m.SurveyorModule)
    }
  ]},
  { path: 'verifikator', component: VerifikatorComponent, canActivate: [ AngularFireAuthGuard ], children: [
    {
      path: '',
      loadChildren: () => import('./verifikator/verifikator.module').then(m => m.VerifikatorModule)
    }
  ]},
  { path: 'main', component: AdminLayoutComponent, canActivate: [ AngularFireAuthGuard ], children: [
    { 
      path: '',  
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }
  ] }
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full',
  // }, {
  //   path: '',
  //   component: AdminLayoutComponent,
  //   children: [{
  //     path: '',
  //     loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
  //   }]
  // }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes), //{
    //    useHash: true
    // })
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
