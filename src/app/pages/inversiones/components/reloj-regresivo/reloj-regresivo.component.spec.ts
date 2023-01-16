import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RelojRegresivoComponent } from './reloj-regresivo.component';

describe('RelojRegresivoComponent', () => {
  let component: RelojRegresivoComponent;
  let fixture: ComponentFixture<RelojRegresivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelojRegresivoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RelojRegresivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
