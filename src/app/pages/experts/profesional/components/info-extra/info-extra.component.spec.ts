import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoExtraComponent } from './info-extra.component';

describe('InfoExtraComponent', () => {
  let component: InfoExtraComponent;
  let fixture: ComponentFixture<InfoExtraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoExtraComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
