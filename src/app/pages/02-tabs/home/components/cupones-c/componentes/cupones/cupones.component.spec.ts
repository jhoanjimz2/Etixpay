import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CuponesComponent } from './cupones.component';

describe('CuponesComponent', () => {
  let component: CuponesComponent;
  let fixture: ComponentFixture<CuponesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuponesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CuponesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
