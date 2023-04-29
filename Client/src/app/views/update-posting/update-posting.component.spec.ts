import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePostingComponent } from './update-posting.component';

describe('UpdatePostingComponent', () => {
  let component: UpdatePostingComponent;
  let fixture: ComponentFixture<UpdatePostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePostingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
