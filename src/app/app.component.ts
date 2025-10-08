import { Component, inject, OnInit } from '@angular/core';
import { SignalRService } from '../shared/services/signalR/signalR.service';
import { ShellComponent } from "./core/shell/shell.component";

@Component({
    selector: 'app-root',
    imports: [ShellComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{
  title = 'pm-platform-fe';
  private signalRService = inject(SignalRService);

  constructor() { }

  ngOnInit(): void {
     this.signalRService.startConnection();
  }
}
