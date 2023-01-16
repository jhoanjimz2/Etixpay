import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistorialDeLoteriaComponent } from './historial-de-loteria.component';

describe('HistorialDeLoteriaComponent', () => {
  let component: HistorialDeLoteriaComponent;
  let fixture: ComponentFixture<HistorialDeLoteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialDeLoteriaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialDeLoteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
