import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SlideClasificactionComponent } from './slide-clasificaction.component';

describe('SlideClasificactionComponent', () => {
  let component: SlideClasificactionComponent;
  let fixture: ComponentFixture<SlideClasificactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideClasificactionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SlideClasificactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
