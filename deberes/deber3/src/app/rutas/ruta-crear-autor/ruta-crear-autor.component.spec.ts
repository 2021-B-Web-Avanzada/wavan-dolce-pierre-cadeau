import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaCrearAutorComponent } from './ruta-crear-autor.component';

describe('RutaCrearAutorComponent', () => {
  let component: RutaCrearAutorComponent;
  let fixture: ComponentFixture<RutaCrearAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaCrearAutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaCrearAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
