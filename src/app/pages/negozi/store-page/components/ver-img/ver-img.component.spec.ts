import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerImgComponent } from './ver-img.component';

describe('VerImgComponent', () => {
  let component: VerImgComponent;
  let fixture: ComponentFixture<VerImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerImgComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
