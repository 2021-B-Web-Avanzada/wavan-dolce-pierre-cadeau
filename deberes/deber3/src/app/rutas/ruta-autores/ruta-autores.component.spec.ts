import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaAutoresComponent } from './ruta-autores.component';

describe('RutaAutoresComponent', () => {
  let component: RutaAutoresComponent;
  let fixture: ComponentFixture<RutaAutoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaAutoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaAutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
