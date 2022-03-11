import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaListaCooperativasComponent } from './ruta-lista-cooperativas.component';

describe('RutaListaCooperativasComponent', () => {
  let component: RutaListaCooperativasComponent;
  let fixture: ComponentFixture<RutaListaCooperativasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaListaCooperativasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaListaCooperativasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
