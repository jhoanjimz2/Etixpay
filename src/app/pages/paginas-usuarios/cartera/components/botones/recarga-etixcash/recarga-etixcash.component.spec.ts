import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecargaEtixcashComponent } from './recarga-etixcash.component';

describe('RecargaEtixcashComponent', () => {
  let component: RecargaEtixcashComponent;
  let fixture: ComponentFixture<RecargaEtixcashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecargaEtixcashComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecargaEtixcashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
