import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValoracionConEstrellasComponent } from './valoracion-con-estrellas.component';

describe('ValoracionConEstrellasComponent', () => {
  let component: ValoracionConEstrellasComponent;
  let fixture: ComponentFixture<ValoracionConEstrellasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValoracionConEstrellasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ValoracionConEstrellasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
