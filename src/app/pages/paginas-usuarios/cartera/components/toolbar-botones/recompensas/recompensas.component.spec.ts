import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecompensasComponent } from '../../botones/recompensas/recompensas.component';

describe('RecompensasComponent', () => {
  let component: RecompensasComponent;
  let fixture: ComponentFixture<RecompensasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecompensasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecompensasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
