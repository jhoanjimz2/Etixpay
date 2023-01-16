import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InscribirTarjetaEtixComponent } from './inscribir-tarjeta-etix.component';

describe('InscribirTarjetaEtixComponent', () => {
  let component: InscribirTarjetaEtixComponent;
  let fixture: ComponentFixture<InscribirTarjetaEtixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscribirTarjetaEtixComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InscribirTarjetaEtixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
