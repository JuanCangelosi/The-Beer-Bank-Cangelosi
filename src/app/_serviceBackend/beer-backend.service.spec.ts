import { TestBed } from '@angular/core/testing';

import { BeerBackendService } from './beer-backend.service';

describe('BeerBackendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeerBackendService = TestBed.get(BeerBackendService);
    expect(service).toBeTruthy();
  });
});
