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
import { BehaviorSubject } from 'rxjs';

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

  items!: MenuItem[];
  profileMenuItems: MenuItem[] | undefined;
  collapsedMenuItems: MenuItem[] | undefined;
  isCollapsed!: boolean;
  activeLabel: any;

  get user() : UserModel | null{
    return this.authService.loggedInUser;
  }

  get isMenuItemVisible(): boolean{
    return this.menuService.menuItemDisabled;
  }

 get menuItems(): MenuItem[]{
  return this.menuService.getMenuItem
 }

  constructor() {}
 

  ngOnInit() {
    this.initMenuItems();
    this.getMainMenuItems();
    this.menuService.setMenuItems(this.items);
  }

  getMainMenuItems(){
   return this.items = [
      {
        label: 'Dashboards',
        icon: 'pi pi-th-large',
        visible: true,
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
        visible: this.isMenuItemVisible,  
        items: [
          {
            label: 'All Boards',
            routerLink: 'boards',
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon p-highlight',
            command: (menuItem) => this.setActive(menuItem),
          },
          {
            label: 'Board',
            routerLink: ['board'],
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon',
            command: (menuItem) => this.setActive(menuItem),
          },
          {
            label: 'Backlog',
            routerLink: '/backlog',
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon',
            command: (menuItem) => this.setActive(menuItem)
          }
        ],
      },
      {
        label: 'Pages',
        icon: 'pi pi-file',
        visible: true,
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
        visible: true,
        icon: 'pi pi-list-check',
        items: [
          {
            label: 'All Tasks',
            routerLink: '/backlog',
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon',
            command: (menuItem) => this.setActive(menuItem)
          },
          {
            label: 'My Tasks',
            routerLink: '/my-tasks',
            icon: 'pi pi-circle-fill',
            styleClass: 'custom-icon',
            command: (menuItem) => this.setActive(menuItem)
          },
        ],
      },
      {
        label: 'Reports & Insights',
        icon: 'pi pi-chart-bar',
        visible: true,
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
  }

  initMenuItems() {
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

    console.log('menuitem: ', event.item)

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
