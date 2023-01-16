import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CheckYourEmailPage } from './check-your-email.page';

describe('CheckYourEmailPage', () => {
  let component: CheckYourEmailPage;
  let fixture: ComponentFixture<CheckYourEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckYourEmailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckYourEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
