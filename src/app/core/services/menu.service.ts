import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuTitle$ = new BehaviorSubject<string>('');
  private menuItemDisabled$ = new BehaviorSubject<boolean>(false);
  private menuItems$ = new BehaviorSubject<MenuItem[]>([]);

  get getActiveMenuTitle(): string {
    return this.menuTitle$.value;
  }

  get menuItemDisabled(): boolean {
    return this.menuItemDisabled$.value;
  }

  get getMenuItem(): MenuItem[] {
    return this.menuItems$.value;
  }

  constructor() {}

  setActiveMenuTitle(menuTitle: string) {
    this.menuTitle$.next(menuTitle);
  }

  setMenuItemVisible(visible: boolean, boardId: string, projectId: string) {
    this.menuItemDisabled$.next(visible);
    const updated = this.menuItems$.value.map(menu => !menu.visible ? 
      { ...menu, visible: true,
         items: menu.items?.map(submenu => submenu.label === 'Board' 
          ? {...submenu, visible: true, routerLink: `projects/${projectId}/boards/${boardId}` } : submenu) } : menu
  );
  
  this.menuItems$.next(updated);
  }

  setMenuItems(items: MenuItem[]){
    this.menuItems$.next(items);
  }
}
