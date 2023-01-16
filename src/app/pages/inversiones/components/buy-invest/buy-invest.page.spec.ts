import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuyInvestPage } from './buy-invest.page';

describe('BuyInvestPage', () => {
  let component: BuyInvestPage;
  let fixture: ComponentFixture<BuyInvestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyInvestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuyInvestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
