import { TestBed } from '@angular/core/testing';

import { BeerStateService } from './beer-state.service';

describe('BeerStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeerStateService = TestBed.get(BeerStateService);
    expect(service).toBeTruthy();
  });
});
