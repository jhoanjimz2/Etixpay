import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisEventosCComponent } from './mis-eventos-c.component';

describe('MisEventosCComponent', () => {
  let component: MisEventosCComponent;
  let fixture: ComponentFixture<MisEventosCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisEventosCComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisEventosCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
