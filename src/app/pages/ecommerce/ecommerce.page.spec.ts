import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EcommercePage } from './ecommerce.page';

describe('EcommercePage', () => {
  let component: EcommercePage;
  let fixture: ComponentFixture<EcommercePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcommercePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EcommercePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
