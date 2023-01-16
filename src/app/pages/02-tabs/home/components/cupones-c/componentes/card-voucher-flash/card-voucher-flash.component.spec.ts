import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardVoucherFlashComponent } from './card-voucher-flash.component';

describe('CardVoucherFlashComponent', () => {
  let component: CardVoucherFlashComponent;
  let fixture: ComponentFixture<CardVoucherFlashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardVoucherFlashComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardVoucherFlashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
