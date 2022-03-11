import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaPagoAsientosComponent } from './ruta-pago-asientos.component';

describe('RutaPagoAsientosComponent', () => {
  let component: RutaPagoAsientosComponent;
  let fixture: ComponentFixture<RutaPagoAsientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaPagoAsientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaPagoAsientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
