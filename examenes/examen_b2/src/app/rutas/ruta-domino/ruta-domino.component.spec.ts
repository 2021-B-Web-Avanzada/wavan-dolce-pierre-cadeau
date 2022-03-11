import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaDominoComponent } from './ruta-domino.component';

describe('RutaDominoComponent', () => {
  let component: RutaDominoComponent;
  let fixture: ComponentFixture<RutaDominoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaDominoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaDominoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
