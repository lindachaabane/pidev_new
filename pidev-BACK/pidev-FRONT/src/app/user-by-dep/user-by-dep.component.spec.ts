import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserByDepComponent } from './user-by-dep.component';

describe('UserByDepComponent', () => {
  let component: UserByDepComponent;
  let fixture: ComponentFixture<UserByDepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserByDepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserByDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
