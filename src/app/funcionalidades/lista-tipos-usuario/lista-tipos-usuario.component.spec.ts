import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTiposUsuarioComponent } from './lista-tipos-usuario.component';

describe('ListaTiposUsuarioComponent', () => {
  let component: ListaTiposUsuarioComponent;
  let fixture: ComponentFixture<ListaTiposUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTiposUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaTiposUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
