import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDetailComponent } from './approve-detail.component';

describe('ApproveDetailComponent', () => {
  let component: ApproveDetailComponent;
  let fixture: ComponentFixture<ApproveDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
