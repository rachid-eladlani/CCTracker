import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';

describe('TodoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertService = TestBed.get(AlertService);
    expect(service).toBeTruthy();
  });
});
