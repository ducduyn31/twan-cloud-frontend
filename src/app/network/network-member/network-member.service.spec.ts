import { TestBed } from '@angular/core/testing';

import { NetworkMemberService } from './network-member.service';

describe('NetworkMemberService', () => {
  let service: NetworkMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
