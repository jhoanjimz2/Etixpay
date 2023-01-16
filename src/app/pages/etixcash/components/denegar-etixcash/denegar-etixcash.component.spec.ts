import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DenegarEtixcashComponent } from './denegar-etixcash.component';

describe('DenegarEtixcashComponent', () => {
  let component: DenegarEtixcashComponent;
  let fixture: ComponentFixture<DenegarEtixcashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenegarEtixcashComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DenegarEtixcashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
