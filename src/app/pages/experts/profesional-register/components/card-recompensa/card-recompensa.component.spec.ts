import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardRecompensaComponent } from './card-recompensa.component';

describe('CardRecompensaComponent', () => {
  let component: CardRecompensaComponent;
  let fixture: ComponentFixture<CardRecompensaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardRecompensaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardRecompensaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
