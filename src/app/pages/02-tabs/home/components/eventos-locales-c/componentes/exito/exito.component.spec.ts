import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExitoComponent } from './exito.component';

describe('ExitoComponent', () => {
  let component: ExitoComponent;
  let fixture: ComponentFixture<ExitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
