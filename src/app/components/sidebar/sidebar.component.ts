import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin/dashboard', title: 'Dashboard',  icon: 'dashboard', class: 'admin' },
    { path: '/admin/user-config', title: 'Konfigurasi Pengguna',  icon:'person', class: 'admin' },
    { path: '/admin/add-user', title: 'Konfigurasi Pengguna', icon: 'person', class: '' },
    { path: '/admin/update-user', title: 'Konfigurasi Pengguna', icon: 'person', class: '' },
    { path: '/surveyor/dashboard', title: 'Dashboard', icon: 'dashboard', class: 'surveyor' },

    // { path: '/admin/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    // { path: '/admin/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/admin/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/admin/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/admin/notifications', title: 'Notifications',  icon:'notifications', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private _userService: UserService) { }

  ngOnInit() {
    var userLocal = JSON.parse(sessionStorage.getItem('userData'))
    console.log(userLocal);
    this.menuItems = ROUTES.filter((data) => {
      return data.class === userLocal.role; //'admin';
    });
    console.log(this.menuItems)
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
