import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistradoPage } from './registrado.page';

describe('RegistradoPage', () => {
  let component: RegistradoPage;
  let fixture: ComponentFixture<RegistradoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistradoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistradoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
