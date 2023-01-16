import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TecladoComponent } from './teclado.component';

describe('TecladoComponent', () => {
  let component: TecladoComponent;
  let fixture: ComponentFixture<TecladoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecladoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TecladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
