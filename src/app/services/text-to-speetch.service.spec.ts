import { TestBed } from '@angular/core/testing';

import { TextToSpeetchService } from './text-to-speetch.service';

describe('TextToSpeetchService', () => {
  let service: TextToSpeetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextToSpeetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
