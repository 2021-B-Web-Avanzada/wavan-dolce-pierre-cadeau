import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaListaViajesComponent } from './ruta-lista-viajes.component';

describe('RutaListaViajesComponent', () => {
  let component: RutaListaViajesComponent;
  let fixture: ComponentFixture<RutaListaViajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaListaViajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaListaViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
