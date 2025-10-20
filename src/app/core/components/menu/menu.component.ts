import { Component, inject, OnInit } from '@angular/core';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { UserModel } from '../../auth/models/user.model';
import { MenuService } from '../../services/menu.service';
import { MenuModule } from 'primeng/menu';

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
    MenuModule
  ],
})
export class MenuComponent implements OnInit {
  private menuService = inject(MenuService);
  private authService = inject(AuthService);
  private router = inject(Router);

  items: MenuItem[] | undefined;
  profileMenuItems: MenuItem[] | undefined;
  collapsedMenuItems: MenuItem[] | undefined;
  isCollapsed!: boolean;
  activeLabel: any;
  isMenuDisable = this.menuService.menuItemDisabled;

  get user() : UserModel | null{
    return this.authService.loggedInUser;
  }

  constructor() {}
 

  ngOnInit() {
    this.initMenuItems();
  }

  initMenuItems() {
    this.items = [
      {
        label: 'Dashboards',
        icon: 'pi pi-th-large',
        items: [
          {
            label: 'Dashboard',
            routerLink: 'dashboard',
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon p-highlight',
            command: (menuItem) => this.setActive(menuItem),
          },
          {
            label: 'Team Management',
            routerLink: '/team-management',
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
        label: 'Boards',
        icon: 'pi pi-th-large',    
        disabled: false,  
        items: [
          {
            label: 'All Boards',
            routerLink: 'dashboard',
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon p-highlight',
            command: (menuItem) => this.setActive(menuItem),
          },
          {
            label: 'Board',
            routerLink: 'board',
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon',
            command: (menuItem) => this.setActive(menuItem),
          },
          {
            label: 'Backlogs',
            routerLink: '/team-management',
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon',
            command: (menuItem) => this.setActive(menuItem)
          }
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

    this.collapsedMenuItems = [
      {
        items: [
          {
            routerLink: '/dashboard',
            icon: 'pi pi-home',
          },
          {
            routerLink: '/project-details',
            icon: 'pi pi-box',
          },
          {
            routerLink: '/team-management',
            icon: 'pi pi-users',
          },
          {
            routerLink: '/reports',
            icon: 'pi pi-chart-line',
          },
          {
            routerLink: '/marketing',
            icon: 'pi pi-chart-bar',

          },
        ],
      },
    ];

    this.profileMenuItems = [
            {
                items: [
                    {
                        label: 'Profile',
                        icon: 'pi pi-user',
                        command: () => this.goToProfile()
                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        command: () => this.logout()
                    }
                ]
            }
        ];
  }

  logout(){
    this.authService.logout();
     this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  search() {
    throw new Error('Method not implemented.');
  }

  setActive(event: MenuItemCommandEvent) {
    this.activeLabel = event.item?.label ?? null;

    this.menuService.setActiveMenuTitle(this.activeLabel);

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
