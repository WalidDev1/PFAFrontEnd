import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAgenceComponent } from './profile-agence.component';

describe('ProfileAgenceComponent', () => {
  let component: ProfileAgenceComponent;
  let fixture: ComponentFixture<ProfileAgenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAgenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
