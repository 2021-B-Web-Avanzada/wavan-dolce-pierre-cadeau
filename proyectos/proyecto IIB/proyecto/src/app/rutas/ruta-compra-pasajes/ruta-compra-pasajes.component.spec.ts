import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaCompraPasajesComponent } from './ruta-compra-pasajes.component';

describe('RutaCompraPasajesComponent', () => {
  let component: RutaCompraPasajesComponent;
  let fixture: ComponentFixture<RutaCompraPasajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaCompraPasajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaCompraPasajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
