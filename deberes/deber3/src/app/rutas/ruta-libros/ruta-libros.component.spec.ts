import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaLibrosComponent } from './ruta-libros.component';

describe('RutaLibrosComponent', () => {
  let component: RutaLibrosComponent;
  let fixture: ComponentFixture<RutaLibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaLibrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
