import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCodigoQrComponent } from './modal-codigo-qr.component';

describe('ModalCodigoQrComponent', () => {
  let component: ModalCodigoQrComponent;
  let fixture: ComponentFixture<ModalCodigoQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCodigoQrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCodigoQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
