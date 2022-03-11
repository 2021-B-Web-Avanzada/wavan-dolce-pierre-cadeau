import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaHistorialComprasComponent } from './ruta-historial-compras.component';

describe('RutaHistorialComprasComponent', () => {
  let component: RutaHistorialComprasComponent;
  let fixture: ComponentFixture<RutaHistorialComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaHistorialComprasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaHistorialComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
