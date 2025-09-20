import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss'],
  standalone: true,
  imports: [Breadcrumb]
})
export class DashboardNavComponent implements OnInit {
 items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor() { }

  ngOnInit() {
    this.initMenuItems();
  }

  initMenuItems(){
    this.items = [
            { label: 'Dashboard' },
            { label: 'Overview' }
        ];

        this.home = { icon: 'pi pi-home', routerLink: 'dashboard' };
  }
}
