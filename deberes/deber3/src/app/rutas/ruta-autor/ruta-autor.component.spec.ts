import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaAutorComponent } from './ruta-autor.component';

describe('RutaAutorComponent', () => {
  let component: RutaAutorComponent;
  let fixture: ComponentFixture<RutaAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaAutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
