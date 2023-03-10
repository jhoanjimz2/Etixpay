import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SimulacionPage } from './simulacion.page';

describe('SimulacionPage', () => {
  let component: SimulacionPage;
  let fixture: ComponentFixture<SimulacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SimulacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
