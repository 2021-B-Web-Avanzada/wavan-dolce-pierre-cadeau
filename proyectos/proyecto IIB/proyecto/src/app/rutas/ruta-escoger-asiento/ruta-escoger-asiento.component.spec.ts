import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaEscogerAsientoComponent } from './ruta-escoger-asiento.component';

describe('RutaEscogerAsientoComponent', () => {
  let component: RutaEscogerAsientoComponent;
  let fixture: ComponentFixture<RutaEscogerAsientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaEscogerAsientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaEscogerAsientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
