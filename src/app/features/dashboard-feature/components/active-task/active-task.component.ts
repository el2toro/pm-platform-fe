import { Component, OnInit } from '@angular/core';
import { TabPanel, TabsModule } from 'primeng/tabs';
import { ProgressBarComponent } from "../progress-bar/progress-bar.component";

@Component({
  selector: 'app-active-task',
  templateUrl: './active-task.component.html',
  styleUrls: ['./active-task.component.scss'],
  imports: [TabPanel, TabsModule, ProgressBarComponent]
})
export class ActiveTaskComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
