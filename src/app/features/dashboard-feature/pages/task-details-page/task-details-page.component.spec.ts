/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaskDetailsPageComponent } from './task-details-page.component';

describe('TaskDetailsPageComponent', () => {
  let component: TaskDetailsPageComponent;
  let fixture: ComponentFixture<TaskDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
