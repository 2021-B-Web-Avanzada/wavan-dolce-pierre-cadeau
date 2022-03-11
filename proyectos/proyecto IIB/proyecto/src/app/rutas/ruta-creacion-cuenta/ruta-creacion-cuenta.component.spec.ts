import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaCreacionCuentaComponent } from './ruta-creacion-cuenta.component';

describe('RutaCreacionCuentaComponent', () => {
  let component: RutaCreacionCuentaComponent;
  let fixture: ComponentFixture<RutaCreacionCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaCreacionCuentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaCreacionCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
