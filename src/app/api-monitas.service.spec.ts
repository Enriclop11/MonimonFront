import { TestBed } from '@angular/core/testing';

import { ApiMonitasService } from './api-monitas.service';

describe('ApiMonitasService', () => {
  let service: ApiMonitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMonitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
