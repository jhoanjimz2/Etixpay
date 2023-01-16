import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectTypePayOrdenComponent } from './select-type-pay-orden.component';

describe('SelectTypePayOrdenComponent', () => {
  let component: SelectTypePayOrdenComponent;
  let fixture: ComponentFixture<SelectTypePayOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTypePayOrdenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectTypePayOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
