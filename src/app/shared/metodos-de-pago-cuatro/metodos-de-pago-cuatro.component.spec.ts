import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MetodosDePagoCuatroComponent } from './metodos-de-pago-cuatro.component';

describe('MetodosDePagoCuatroComponent', () => {
  let component: MetodosDePagoCuatroComponent;
  let fixture: ComponentFixture<MetodosDePagoCuatroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetodosDePagoCuatroComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MetodosDePagoCuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
