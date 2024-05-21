import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarArticuloComponent } from './cargar-articulo.component';

describe('CargarArticuloComponent', () => {
  let component: CargarArticuloComponent;
  let fixture: ComponentFixture<CargarArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarArticuloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargarArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
