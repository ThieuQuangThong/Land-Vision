import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { webSocket } from 'rxjs/webSocket';
import { ChatBotService } from 'src/app/_service/chat-bot.service';
import { message } from 'src/app/models/chat-model';


@Component({
  selector: 'app-chat-bot-rasa',
  templateUrl: './chat-bot-rasa.component.html',
  styleUrls: ['./chat-bot-rasa.component.css']
})
export class ChatBotRasaComponent {
@ViewChild('tooltip') manualTooltip!: MatTooltip;

  text : string = '';
  messages : message [] =[];
  showBox = false;
  popUp = true;

  constructor(private chatBotService : ChatBotService, private http : HttpClient){}
  showBoxChat(){
    this.showBox = true;
    this.popUp = false;
    this.manualTooltip.hide();
  }
  hideBoxChat(){
    this.showBox = false;
    this.popUp = true;
    this.manualTooltip.show();
  }
  sendMessage() {
    const name = 1; // Người gửi tin nhắn (có thể thay đổi tùy theo nhu cầu)
    const message = this.text; // Nội dung tin nhắn (có thể thay đổi tùy theo nhu cầu)
    const chatMessage: message = {
      name: name,
      message: message
    };
    this.messages.push(chatMessage);
    this.chatBotService.chatChit(this.text).subscribe(
      response  => {
    const name = 0; // Người gửi tin nhắn (có thể thay đổi tùy theo nhu cầu)
    const message = response.response; // Nội dung tin nhắn (có thể thay đổi tùy theo nhu cầu)
    const chatMessage: message = {
      name: name,
      message: message
    };
    this.messages.push(chatMessage);

        // Xử lý phản hồi từ dịch vụ chatBotService tại đây
      }
    );
    this.text  = '';
      console.log(this.messages)
  }
}
