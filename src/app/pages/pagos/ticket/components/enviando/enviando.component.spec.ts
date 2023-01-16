import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnviandoComponent } from './enviando.component';

describe('EnviandoComponent', () => {
  let component: EnviandoComponent;
  let fixture: ComponentFixture<EnviandoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviandoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnviandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
