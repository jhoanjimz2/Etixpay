import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MovimientoEtixcashComponent } from './movimiento-etixcash.component';

describe('MovimientoEtixcashComponent', () => {
  let component: MovimientoEtixcashComponent;
  let fixture: ComponentFixture<MovimientoEtixcashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientoEtixcashComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MovimientoEtixcashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
