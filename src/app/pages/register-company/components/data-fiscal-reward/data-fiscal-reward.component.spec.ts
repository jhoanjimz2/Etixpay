import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DataFiscalRewardComponent } from './data-fiscal-reward.component';

describe('DataTaxRewardComponent', () => {
  let component: DataFiscalRewardComponent;
  let fixture: ComponentFixture<DataFiscalRewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataFiscalRewardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DataFiscalRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
