import { Component, OnInit } from '@angular/core';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Menu } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TooltipModule,
    PanelMenu,
    IconFieldModule,
    InputIconModule,
    Button,
    InputText,
    Menu,
  ],
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;
  projectItems: MenuItem[] | undefined;
  title = 'Eugenia';
  isCollapsed!: boolean;
  activeLabel: any;

  constructor() {}

  ngOnInit() {
    this.initMenuItems();
  }

  initMenuItems() {
    this.items = [
      {
        label: 'Dashboards',
        icon: 'pi pi-th-large',
        expanded: true,
        items: [
          {
            label: 'Dashboard',
            expanded: false,
            routerLink: '',
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon p-highlight',
            command: (menuItem) => this.setActive(menuItem),
          },
          {
            label: 'Team Management',
            routerLink: '/team',
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon',
            command: (menuItem) => this.setActive(menuItem)
          },
          {
            label: 'Reports & Insights',
            routerLink: '/reports',
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon',
            command: (menuItem) => this.setActive(menuItem)
          },
          {
            label: 'Marketing',
            routerLink: '/marketing',
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon',
            command: (menuItem) => this.setActive(menuItem)
          },
        ],
      },
      {
        label: 'Pages',
        icon: 'pi pi-file',
        items: [
          {
            label: 'Profile',
            routerLink: '/profile',
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon',
            command: (menuItem) => this.setActive(menuItem)
          },
          {
            label: 'Settings',
            routerLink: '/settings',
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon',
            command: (menuItem) => this.setActive(menuItem)
          },
        ],
      },
      {
        label: 'Tasks',
        icon: 'pi pi-list-check',
        items: [
          {
            label: 'All Tasks',
            routerLink: '/tasks',
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon',
            command: (menuItem) => this.setActive(menuItem)
          },
          {
            label: 'My Tasks',
            routerLink: '/tasks/mine',
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon',
            command: (menuItem) => this.setActive(menuItem)
          },
        ],
      },
      {
        label: 'Reports & Insights',
        icon: 'pi pi-chart-bar',
        items: [
          {
            label: 'Reports',
            routerLink: '/reports',
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon',
            command: (menuItem) => this.setActive(menuItem)
          },
          {
            label: 'Analytics',
            routerLink: '/analytics',
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon',
            command: (menuItem) => this.setActive(menuItem)
          },
        ],
      },
    ];

    this.projectItems = [
      {
        items: [
          {
            label: 'Dashboard',
            routerLink: '/dashboard',
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon',
          },
          {
            label: 'Project Details',
            routerLink: '/projects/details',
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon',
          },
          {
            label: 'Team Management',
            routerLink: '/team',
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon',
          },
          {
            label: 'Reports & Insights',
            routerLink: '/reports',
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon',
          },
          {
            label: 'Marketing',
            routerLink: '/marketing',
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon',
          },
        ],
      },
    ];
  }

  goToProfile() {
    throw new Error('Method not implemented.');
  }

  search() {
    throw new Error('Method not implemented.');
  }

  setActive(event: MenuItemCommandEvent) {
    this.activeLabel = event.item?.label ?? null;

    if (!event.item) {
      return;
    }

    // clear previous highlights
    this.items?.forEach((group) =>
      group.items?.forEach((i) => (i.styleClass = 'custom-icon'))
    );

    // add highlight to the clicked menuitem
    event.item.styleClass = 'custom-icon p-highlight';
  }
}
