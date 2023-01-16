import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EurosHastaRegaloComponent } from './euros-hasta-regalo.component';

describe('EurosHastaRegaloComponent', () => {
  let component: EurosHastaRegaloComponent;
  let fixture: ComponentFixture<EurosHastaRegaloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EurosHastaRegaloComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EurosHastaRegaloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
