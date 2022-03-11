import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaActualizarCooperativaComponent } from './ruta-actualizar-cooperativa.component';

describe('RutaActualizarCooperativaComponent', () => {
  let component: RutaActualizarCooperativaComponent;
  let fixture: ComponentFixture<RutaActualizarCooperativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaActualizarCooperativaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaActualizarCooperativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
