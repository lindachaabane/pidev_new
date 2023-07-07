import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDepartementComponent } from './manage-departement.component';

describe('ManageDepartementComponent', () => {
  let component: ManageDepartementComponent;
  let fixture: ComponentFixture<ManageDepartementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDepartementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDepartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
