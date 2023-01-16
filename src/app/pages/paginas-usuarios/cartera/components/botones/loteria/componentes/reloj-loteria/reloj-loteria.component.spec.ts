import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RelojLoteriaComponent } from './reloj-loteria.component';

describe('RelojLoteriaComponent', () => {
  let component: RelojLoteriaComponent;
  let fixture: ComponentFixture<RelojLoteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelojLoteriaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RelojLoteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
