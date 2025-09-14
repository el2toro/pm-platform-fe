import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, TabsModule]
})
export class DashboardMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
