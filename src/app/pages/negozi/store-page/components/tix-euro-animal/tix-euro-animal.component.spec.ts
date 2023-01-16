import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TixEuroAnimalComponent } from './tix-euro-animal.component';

describe('TixEuroAnimalComponent', () => {
  let component: TixEuroAnimalComponent;
  let fixture: ComponentFixture<TixEuroAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TixEuroAnimalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TixEuroAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
