import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapaDescripcionFotoComponent } from './mapa-descripcion-foto.component';

describe('MapaDescripcionFotoComponent', () => {
  let component: MapaDescripcionFotoComponent;
  let fixture: ComponentFixture<MapaDescripcionFotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaDescripcionFotoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapaDescripcionFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
