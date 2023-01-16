import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WelcomeNewsShopsComponent } from './welcome-news-shops.component';

describe('WelcomeNewsShopsComponent', () => {
  let component: WelcomeNewsShopsComponent;
  let fixture: ComponentFixture<WelcomeNewsShopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeNewsShopsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeNewsShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
