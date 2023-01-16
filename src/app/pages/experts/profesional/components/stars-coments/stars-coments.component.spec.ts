import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StarsComentsComponent } from './stars-coments.component';

describe('StarsComentsComponent', () => {
  let component: StarsComentsComponent;
  let fixture: ComponentFixture<StarsComentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarsComentsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StarsComentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
