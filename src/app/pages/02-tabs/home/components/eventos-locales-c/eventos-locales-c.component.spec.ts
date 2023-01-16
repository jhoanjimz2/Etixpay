import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventosLocalesCComponent } from './eventos-locales-c.component';

describe('EventosLocalesCComponent', () => {
  let component: EventosLocalesCComponent;
  let fixture: ComponentFixture<EventosLocalesCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosLocalesCComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventosLocalesCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
