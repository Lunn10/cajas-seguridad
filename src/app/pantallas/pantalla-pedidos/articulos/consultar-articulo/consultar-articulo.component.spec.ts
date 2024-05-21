import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarArticuloComponent } from './consultar-articulo.component';

describe('ConsultarArticuloComponent', () => {
  let component: ConsultarArticuloComponent;
  let fixture: ComponentFixture<ConsultarArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarArticuloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultarArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
