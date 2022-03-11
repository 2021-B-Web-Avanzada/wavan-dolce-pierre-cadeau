import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaActualizarViajeComponent } from './ruta-actualizar-viaje.component';

describe('RutaActualizarViajeComponent', () => {
  let component: RutaActualizarViajeComponent;
  let fixture: ComponentFixture<RutaActualizarViajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaActualizarViajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaActualizarViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
