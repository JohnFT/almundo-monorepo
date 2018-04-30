import { TestBed, inject } from '@angular/core/testing';

import { AppCanactiveService } from './app-canactive.service';

describe('AppCanactiveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppCanactiveService]
    });
  });

  it('should be created', inject([AppCanactiveService], (service: AppCanactiveService) => {
    expect(service).toBeTruthy();
  }));
});
