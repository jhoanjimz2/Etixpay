import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardVoucherAllComponent } from './card-voucher-all.component';

describe('CardVoucherAllComponent', () => {
  let component: CardVoucherAllComponent;
  let fixture: ComponentFixture<CardVoucherAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardVoucherAllComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardVoucherAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
