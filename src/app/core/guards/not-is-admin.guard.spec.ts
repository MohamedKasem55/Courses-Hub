import { TestBed } from '@angular/core/testing';

import { NotIsAdminGuard } from './not-is-admin.guard';

describe('NotIsAdminGuard', () => {
  let guard: NotIsAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotIsAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
