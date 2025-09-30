import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuTitle$ = new BehaviorSubject<string>('');

  get getActiveMenuTitle(): string {
    return this.menuTitle$.value;
  }

  constructor() {}

  setActiveMenuTitle(menuTitle: string) {
    this.menuTitle$.next(menuTitle);
  }
}
