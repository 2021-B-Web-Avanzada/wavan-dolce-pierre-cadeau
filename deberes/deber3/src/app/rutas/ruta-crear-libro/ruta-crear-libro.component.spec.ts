import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaCrearLibroComponent } from './ruta-crear-libro.component';

describe('RutaCrearLibroComponent', () => {
  let component: RutaCrearLibroComponent;
  let fixture: ComponentFixture<RutaCrearLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaCrearLibroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaCrearLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
