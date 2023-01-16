import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TolbarBotonesComponent } from './tolbar-botones.component';

describe('TolbarBotonesComponent', () => {
  let component: TolbarBotonesComponent;
  let fixture: ComponentFixture<TolbarBotonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TolbarBotonesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TolbarBotonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
