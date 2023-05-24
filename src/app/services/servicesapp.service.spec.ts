import { TestBed } from '@angular/core/testing';

import { ServicesappService } from './servicesapp.service';

describe('ServicesappService', () => {
  let service: ServicesappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
