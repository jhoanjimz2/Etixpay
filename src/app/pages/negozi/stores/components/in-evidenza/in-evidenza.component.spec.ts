import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InEvidenzaComponent } from './in-evidenza.component';

describe('InEvidenzaComponent', () => {
  let component: InEvidenzaComponent;
  let fixture: ComponentFixture<InEvidenzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InEvidenzaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InEvidenzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
