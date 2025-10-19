import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuTitle$ = new BehaviorSubject<string>('');
  private menuItemDisabled$ = new BehaviorSubject<boolean>(true);

  get getActiveMenuTitle(): string {
    return this.menuTitle$.value;
  }

  get menuItemDisabled(): boolean {
    return this.menuItemDisabled$.value;
  }

  constructor() {}

  setActiveMenuTitle(menuTitle: string) {
    this.menuTitle$.next(menuTitle);
  }

  setMenuItemDisabled(disabled: boolean) {
    this.menuItemDisabled$.next(disabled);
  }
}
