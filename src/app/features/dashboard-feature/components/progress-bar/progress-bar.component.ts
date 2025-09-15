import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  standalone: true
})
export class ProgressBarComponent implements OnInit {
 @Input() title!: string;
 @Input() progress!: number;
 @Input() progressBackground!: string;
 @Input() progressBarBackground!: string;

  constructor() { }

  ngOnInit() {
  }

}
