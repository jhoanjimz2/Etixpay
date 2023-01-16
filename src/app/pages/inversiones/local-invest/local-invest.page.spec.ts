import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocalInvestPage } from './local-invest.page';

describe('LocalInvestPage', () => {
  let component: LocalInvestPage;
  let fixture: ComponentFixture<LocalInvestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalInvestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocalInvestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
