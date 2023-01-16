import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MetodoDePagoTresComponent } from './metodo-de-pago-tres.component';

describe('MetodoDePagoTresComponent', () => {
  let component: MetodoDePagoTresComponent;
  let fixture: ComponentFixture<MetodoDePagoTresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetodoDePagoTresComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MetodoDePagoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
