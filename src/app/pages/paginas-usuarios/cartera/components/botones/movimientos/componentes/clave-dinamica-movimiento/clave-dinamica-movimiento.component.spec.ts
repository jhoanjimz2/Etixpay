import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClaveDinamicaMovimientoComponent } from './clave-dinamica-movimiento.component';

describe('ClaveDinamicaMovimientoComponent', () => {
  let component: ClaveDinamicaMovimientoComponent;
  let fixture: ComponentFixture<ClaveDinamicaMovimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaveDinamicaMovimientoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClaveDinamicaMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
