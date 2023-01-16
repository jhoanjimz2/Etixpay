import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IdiomaInicialPage } from './idioma-inicial.page';

describe('IdiomaInicialPage', () => {
  let component: IdiomaInicialPage;
  let fixture: ComponentFixture<IdiomaInicialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdiomaInicialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IdiomaInicialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
