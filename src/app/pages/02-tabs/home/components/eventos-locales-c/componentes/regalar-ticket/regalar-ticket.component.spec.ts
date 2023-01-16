import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegalarTicketComponent } from './regalar-ticket.component';

describe('RegalarTicketComponent', () => {
  let component: RegalarTicketComponent;
  let fixture: ComponentFixture<RegalarTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegalarTicketComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegalarTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
