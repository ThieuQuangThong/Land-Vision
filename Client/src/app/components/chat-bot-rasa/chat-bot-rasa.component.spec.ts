import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotRasaComponent } from './chat-bot-rasa.component';

describe('ChatBotRasaComponent', () => {
  let component: ChatBotRasaComponent;
  let fixture: ComponentFixture<ChatBotRasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatBotRasaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBotRasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
