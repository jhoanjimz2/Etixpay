import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StarsValorationComponent } from './stars-valoration.component';

describe('StarsValorationComponent', () => {
  let component: StarsValorationComponent;
  let fixture: ComponentFixture<StarsValorationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarsValorationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StarsValorationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
