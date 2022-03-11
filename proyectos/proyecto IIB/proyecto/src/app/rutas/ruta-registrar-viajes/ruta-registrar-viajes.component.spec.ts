import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaRegistrarViajesComponent } from './ruta-registrar-viajes.component';

describe('RutaRegistrarViajesComponent', () => {
  let component: RutaRegistrarViajesComponent;
  let fixture: ComponentFixture<RutaRegistrarViajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaRegistrarViajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaRegistrarViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
