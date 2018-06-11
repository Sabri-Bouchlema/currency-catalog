import { TestBed, inject } from '@angular/core/testing';

import { LastSearchService } from './last-search.service';

describe('LastSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LastSearchService]
    });
  });

  it('should be created', inject([LastSearchService], (service: LastSearchService) => {
    expect(service).toBeTruthy();
  }));
});
