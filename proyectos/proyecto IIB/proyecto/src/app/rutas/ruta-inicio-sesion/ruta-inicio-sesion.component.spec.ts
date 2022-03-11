import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaInicioSesionComponent } from './ruta-inicio-sesion.component';

describe('RutaInicioSesionComponent', () => {
  let component: RutaInicioSesionComponent;
  let fixture: ComponentFixture<RutaInicioSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaInicioSesionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaInicioSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
