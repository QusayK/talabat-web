import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantOrdersItemComponent } from './restaurant-orders-item.component';

describe('RestaurantOrdersItemComponent', () => {
  let component: RestaurantOrdersItemComponent;
  let fixture: ComponentFixture<RestaurantOrdersItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantOrdersItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantOrdersItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
