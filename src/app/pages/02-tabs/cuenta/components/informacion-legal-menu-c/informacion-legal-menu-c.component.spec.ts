import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InformacionLegalMenuCComponent } from './informacion-legal-menu-c.component';

describe('InformacionLegalMenuCComponent', () => {
  let component: InformacionLegalMenuCComponent;
  let fixture: ComponentFixture<InformacionLegalMenuCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionLegalMenuCComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InformacionLegalMenuCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
