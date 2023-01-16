import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearCuentaProfesionalMenuCComponent } from './crear-cuenta-profesional-menu-c.component';

describe('CrearCuentaProfesionalMenuCComponent', () => {
  let component: CrearCuentaProfesionalMenuCComponent;
  let fixture: ComponentFixture<CrearCuentaProfesionalMenuCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearCuentaProfesionalMenuCComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearCuentaProfesionalMenuCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
