import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropoacComponent } from './propoac.component';

describe('PropoacComponent', () => {
  let component: PropoacComponent;
  let fixture: ComponentFixture<PropoacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropoacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropoacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
