import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileVendeurComponent } from './profile-vendeur.component';

describe('ProfileVendeurComponent', () => {
  let component: ProfileVendeurComponent;
  let fixture: ComponentFixture<ProfileVendeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileVendeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileVendeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
