import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { MenuService } from '../../../../core/services/menu.service';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss'],
  standalone: true,
  imports: [Breadcrumb]
})
export class DashboardNavComponent implements OnInit {
  private menuService = inject(MenuService);

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  selectedItem = '';

  get getSelectedItem() : string{
    return this.menuService.getActiveMenuTitle
  }
  constructor() { }

  ngOnInit() {
    this.selectedItem = this.getSelectedItem
    this.initMenuItems();
  }

  //TODO: add sequencial labels dinamicly
  initMenuItems(){
    this.items = [
            { label: 'Dashboard' },
            { label: this.selectedItem }
        ];

        this.home = { icon: 'pi pi-home', routerLink: 'dashboard' };
  }

  // Add a service that return the breadcrumb items based on the current route
}
