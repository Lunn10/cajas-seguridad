import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarNotaDebitoComponent } from './consultar-nota-debito.component';

describe('ConsultarNotaDebitoComponent', () => {
  let component: ConsultarNotaDebitoComponent;
  let fixture: ComponentFixture<ConsultarNotaDebitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarNotaDebitoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultarNotaDebitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
