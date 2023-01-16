import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EtixmallComponent } from './etixmall.component';

describe('EtixmallComponent', () => {
  let component: EtixmallComponent;
  let fixture: ComponentFixture<EtixmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtixmallComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EtixmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
