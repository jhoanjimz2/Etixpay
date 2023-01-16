import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClaveDinamicaRetirarComponent } from './clave-dinamica-retirar.component';

describe('ClaveDinamicaRetirarComponent', () => {
  let component: ClaveDinamicaRetirarComponent;
  let fixture: ComponentFixture<ClaveDinamicaRetirarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaveDinamicaRetirarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClaveDinamicaRetirarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
