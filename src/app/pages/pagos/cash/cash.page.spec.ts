import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CashPage } from './cash.page';

describe('CashPage', () => {
  let component: CashPage;
  let fixture: ComponentFixture<CashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
