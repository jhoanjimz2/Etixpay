import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NosCalificaMenuCComponent } from './nos-califica-menu-c.component';

describe('NosCalificaMenuCComponent', () => {
  let component: NosCalificaMenuCComponent;
  let fixture: ComponentFixture<NosCalificaMenuCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NosCalificaMenuCComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NosCalificaMenuCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
