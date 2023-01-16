import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfesionalsPage } from './profesionals.page';

describe('ProfesionalsPage', () => {
  let component: ProfesionalsPage;
  let fixture: ComponentFixture<ProfesionalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesionalsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfesionalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
