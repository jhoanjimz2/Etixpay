import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalPurchaceSuccComponent } from './modal-purchace-succ.component';

describe('ModalPurchaceSuccComponent', () => {
  let component: ModalPurchaceSuccComponent;
  let fixture: ComponentFixture<ModalPurchaceSuccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPurchaceSuccComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalPurchaceSuccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
