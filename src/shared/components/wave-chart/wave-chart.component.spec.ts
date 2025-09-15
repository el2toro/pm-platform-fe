/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WaveChartComponent } from './wave-chart.component';

describe('WaveChartComponent', () => {
  let component: WaveChartComponent;
  let fixture: ComponentFixture<WaveChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaveChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaveChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
