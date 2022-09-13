import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    // this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.menuItems = ROUTES.filter((data) => {
      return data.class === 'admin';
    });
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
