import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventsStoreComponent } from './events-store.component';

describe('EventsStoreComponent', () => {
  let component: EventsStoreComponent;
  let fixture: ComponentFixture<EventsStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsStoreComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventsStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
