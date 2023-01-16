import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllProfesionalsPage } from './all-profesionals.page';

describe('AllProfesionalsPage', () => {
  let component: AllProfesionalsPage;
  let fixture: ComponentFixture<AllProfesionalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProfesionalsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllProfesionalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
