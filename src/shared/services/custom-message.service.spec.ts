/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomMessageService } from './custom-message.service';

describe('Service: CustomMessage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomMessageService]
    });
  });

  it('should ...', inject([CustomMessageService], (service: CustomMessageService) => {
    expect(service).toBeTruthy();
  }));
});
