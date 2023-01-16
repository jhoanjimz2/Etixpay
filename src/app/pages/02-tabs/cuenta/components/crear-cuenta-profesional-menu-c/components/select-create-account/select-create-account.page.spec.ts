import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectCreateAccountPage } from './select-create-account.page';

describe('SelectCreateAccountPage', () => {
  let component: SelectCreateAccountPage;
  let fixture: ComponentFixture<SelectCreateAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCreateAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectCreateAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
