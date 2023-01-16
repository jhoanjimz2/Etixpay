import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardVoucherAdquiridoComponent } from './card-voucher-adquirido.component';

describe('CardVoucherAdquiridoComponent', () => {
  let component: CardVoucherAdquiridoComponent;
  let fixture: ComponentFixture<CardVoucherAdquiridoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardVoucherAdquiridoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardVoucherAdquiridoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
