import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectUserToDepComponent } from './affect-user-to-dep.component';

describe('AffectUserToDepComponent', () => {
  let component: AffectUserToDepComponent;
  let fixture: ComponentFixture<AffectUserToDepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectUserToDepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectUserToDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
