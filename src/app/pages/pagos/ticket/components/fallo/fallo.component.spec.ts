import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FalloComponent } from './fallo.component';

describe('FalloComponent', () => {
  let component: FalloComponent;
  let fixture: ComponentFixture<FalloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FalloComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FalloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
