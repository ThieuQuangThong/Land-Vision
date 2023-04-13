import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConfirmSucceededComponent } from './email-confirm-succeeded.component';

describe('EmailConfirmSucceededComponent', () => {
  let component: EmailConfirmSucceededComponent;
  let fixture: ComponentFixture<EmailConfirmSucceededComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailConfirmSucceededComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailConfirmSucceededComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
