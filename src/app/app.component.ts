import { Component, inject, OnInit } from '@angular/core';
import { ShellComponent } from "./core/shell/shell.component";

@Component({
    selector: 'app-root',
    imports: [ShellComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{
  title = 'pm-platform-fe';

  constructor() { }

  ngOnInit(): void {
  }
}
