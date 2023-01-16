import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EtixWinPage } from './etix-win.page';

describe('EtixWinPage', () => {
  let component: EtixWinPage;
  let fixture: ComponentFixture<EtixWinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtixWinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EtixWinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
