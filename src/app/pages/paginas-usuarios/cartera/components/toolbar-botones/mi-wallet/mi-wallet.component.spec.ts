import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MiWalletComponent } from './mi-wallet.component';

describe('MiWalletComponent', () => {
  let component: MiWalletComponent;
  let fixture: ComponentFixture<MiWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiWalletComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MiWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
