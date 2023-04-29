import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMapListDetailComponent } from './edit-map-list-detail.component';

describe('EditMapListDetailComponent', () => {
  let component: EditMapListDetailComponent;
  let fixture: ComponentFixture<EditMapListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMapListDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMapListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
