import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaLibroComponent } from './ruta-libro.component';

describe('RutaLibroComponent', () => {
  let component: RutaLibroComponent;
  let fixture: ComponentFixture<RutaLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaLibroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
