import { TestBed } from '@angular/core/testing';

import { NetworkGeneralService } from './network-general.service';

describe('NetworkGeneralService', () => {
  let service: NetworkGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
