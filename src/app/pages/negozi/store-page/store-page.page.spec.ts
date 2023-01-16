import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StorePagePage } from './store-page.page';

describe('StorePagePage', () => {
  let component: StorePagePage;
  let fixture: ComponentFixture<StorePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorePagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StorePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
