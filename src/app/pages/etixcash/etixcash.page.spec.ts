import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EtixcashPage } from './etixcash.page';

describe('EtixcashPage', () => {
  let component: EtixcashPage;
  let fixture: ComponentFixture<EtixcashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtixcashPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EtixcashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
