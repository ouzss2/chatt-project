import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from '../Models/User';


@Injectable({
  providedIn: 'root'
})
export class MessageService {





  webSocketEndPoint: string = 'http://localhost:8080/ws';
  topic: string = "/topic/greetings";
  stompClient: any;
  MessageReceived:any[]
  MessageSent:any[]
  connectedElement:[]
 
  private usersUrl=environment.url
  private userU = environment.Userurl

  constructor(private http: HttpClient){}
  OnConnectToBack(){
      
  }

  _connect() {
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame) {
        _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
            _this.onMessageReceived(sdkEvent);
        });
        //_this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
};


_disconnect() {
    if (this.stompClient !== null) {
        this.stompClient.disconnect();
    }
    console.log("Disconnected");
}

// on error, schedule a reconnection attempt
errorCallBack(error) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
        this._connect();
    }, 5000);
}

_GetAllMessages(user,sender){
return this.http.get<any[]>(this.usersUrl+""+user);
}

_send(message) {
    console.log("calling logout api via web socket");
    this.stompClient.send("/app/hello", {}, JSON.stringify(message));
    //this.MessageSent.push(message);
}

onMessageReceived(message) {
    console.log("Message Recieved from Server :: " + message);
   // this.MessageReceived.push(message.body);
   return message;
}

GetConnectedUsers(etat) {
  
    return this.http.get<User[]>(this.userU+""+etat);
   }


addUsertoBase(username) {
    return this.http.post<[User]>(this.usersUrl+"adduser",username);
   }

}
