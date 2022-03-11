import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaRegistroCooperativaComponent } from './ruta-registro-cooperativa.component';

describe('RutaRegistroCooperativaComponent', () => {
  let component: RutaRegistroCooperativaComponent;
  let fixture: ComponentFixture<RutaRegistroCooperativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaRegistroCooperativaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaRegistroCooperativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
