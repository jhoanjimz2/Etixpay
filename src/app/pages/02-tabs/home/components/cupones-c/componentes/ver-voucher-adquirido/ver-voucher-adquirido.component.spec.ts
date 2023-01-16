import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerVoucherAdquiridoComponent } from './ver-voucher-adquirido.component';

describe('VerVoucherAdquiridoComponent', () => {
  let component: VerVoucherAdquiridoComponent;
  let fixture: ComponentFixture<VerVoucherAdquiridoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerVoucherAdquiridoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerVoucherAdquiridoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
