import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopPrComponent } from './top-pr.component';

describe('TopPrComponent', () => {
  let component: TopPrComponent;
  let fixture: ComponentFixture<TopPrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopPrComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopPrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
