import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardApproveTableComponent } from './card-approve-table.component';

describe('CardApproveTableComponent', () => {
  let component: CardApproveTableComponent;
  let fixture: ComponentFixture<CardApproveTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardApproveTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardApproveTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
