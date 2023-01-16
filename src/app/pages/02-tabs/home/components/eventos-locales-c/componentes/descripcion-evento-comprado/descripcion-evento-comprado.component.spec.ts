import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DescripcionEventoCompradoComponent } from './descripcion-evento-comprado.component';

describe('DescripcionEventoCompradoComponent', () => {
  let component: DescripcionEventoCompradoComponent;
  let fixture: ComponentFixture<DescripcionEventoCompradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescripcionEventoCompradoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DescripcionEventoCompradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
