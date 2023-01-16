import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LectorQrComponent } from './lector-qr.component';

describe('LectorQrComponent', () => {
  let component: LectorQrComponent;
  let fixture: ComponentFixture<LectorQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectorQrComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LectorQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
