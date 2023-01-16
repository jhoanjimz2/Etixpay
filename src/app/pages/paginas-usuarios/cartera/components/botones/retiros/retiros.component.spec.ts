import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RetirosComponent } from './retiros.component';

describe('RetirosComponent', () => {
  let component: RetirosComponent;
  let fixture: ComponentFixture<RetirosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetirosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RetirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
