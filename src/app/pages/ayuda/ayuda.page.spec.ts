import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AyudaPage } from './ayuda.page';

describe('AyudaPage', () => {
  let component: AyudaPage;
  let fixture: ComponentFixture<AyudaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyudaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AyudaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
