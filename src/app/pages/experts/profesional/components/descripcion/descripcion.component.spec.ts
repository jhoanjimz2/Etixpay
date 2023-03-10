import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DescripcionComponent } from './descripcion.component';

describe('DescripcionComponent', () => {
  let component: DescripcionComponent;
  let fixture: ComponentFixture<DescripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescripcionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DescripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
