import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarNotaDebitoComponent } from './cargar-nota-debito.component';

describe('CargarNotaDebitoComponent', () => {
  let component: CargarNotaDebitoComponent;
  let fixture: ComponentFixture<CargarNotaDebitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarNotaDebitoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargarNotaDebitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
