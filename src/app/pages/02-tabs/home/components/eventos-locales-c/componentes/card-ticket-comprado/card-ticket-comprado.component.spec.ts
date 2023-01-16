import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardTicketCompradoComponent } from './card-ticket-comprado.component';

describe('CardTicketCompradoComponent', () => {
  let component: CardTicketCompradoComponent;
  let fixture: ComponentFixture<CardTicketCompradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardTicketCompradoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardTicketCompradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
