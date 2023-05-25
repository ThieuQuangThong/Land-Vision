import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { response } from 'express';
import { webSocket } from 'rxjs/webSocket';
import { ChatBotService } from 'src/app/_service/chat-bot.service';
import {  message } from 'src/app/models/chat-model';


@Component({
  selector: 'app-chat-bot-rasa',
  templateUrl: './chat-bot-rasa.component.html',
  styleUrls: ['./chat-bot-rasa.component.css']
})
export class ChatBotRasaComponent {
  
@ViewChild('tooltip') manualTooltip!: MatTooltip;

  text : string = '';
  messages : message [] = [];
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
      const data:message = {
        name: 1,
        type_response: 'text',
        response: this.text
      }

      this.messages.unshift(data)
    // const name = 1; // Người gửi tin nhắn (có thể thay đổi tùy theo nhu cầu)
    // const message = this.text; // Nội dung tin nhắn (có thể thay đổi tùy theo nhu cầu)
    // this.messages.push(this.text);
    this.chatBotService.chatChit(this.text).subscribe(
      response  => {
        
          const botResponse = response;
          botResponse.name = 0;
          this.messages.unshift(botResponse);
        
        console.log( this.messages)
        
        // Xử lý phản hồi từ dịch vụ chatBotService tại đây
      }
    );
    this.text  = '';
      
  }

  onClickAddress(address: any){
    this.chatBotService.search(address).subscribe(
      {
        next: (res: message)=> {
          const botResponse: message = res;
          botResponse.name = 0;
          this.messages.unshift(botResponse);
          
        },
        error: (err)=> {
          console.log(err)
        }
      }
    )
    
  }
}
