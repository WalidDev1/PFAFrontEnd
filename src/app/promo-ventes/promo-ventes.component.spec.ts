import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoVentesComponent } from './promo-ventes.component';

describe('PromoVentesComponent', () => {
  let component: PromoVentesComponent;
  let fixture: ComponentFixture<PromoVentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoVentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoVentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
