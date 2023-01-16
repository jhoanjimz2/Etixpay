import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CuponesCComponent } from './cupones-c.component';

describe('CuponesCComponent', () => {
  let component: CuponesCComponent;
  let fixture: ComponentFixture<CuponesCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuponesCComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CuponesCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
