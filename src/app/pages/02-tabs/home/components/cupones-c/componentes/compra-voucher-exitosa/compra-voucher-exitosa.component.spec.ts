import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompraVoucherExitosaComponent } from './compra-voucher-exitosa.component';

describe('CompraVoucherExitosaComponent', () => {
  let component: CompraVoucherExitosaComponent;
  let fixture: ComponentFixture<CompraVoucherExitosaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraVoucherExitosaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompraVoucherExitosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
