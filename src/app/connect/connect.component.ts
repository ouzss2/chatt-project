import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { User } from '../Models/User';
import { WebSocketAPI } from '../Models/WebSocketAPI ';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {

  webSocketAPI: WebSocketAPI;
  greeting: any;
  name: string;
  username:string

  constructor(private router: Router,private service:MessageService){}

  ngOnInit() {
    
  }

  connect(){
    
    if(this.username=="" || this.username==undefined){
      alert("Type Your name Please !")
    }else{
      this.service._connect();
      this.service.addUsertoBase({name:this.username,etat:"Connected"}).subscribe(res=>{
        setTimeout (() => {
      
          this.router.navigate(['/connect',{usename:this.username}]);
       }, 1000);
      })
     
    }
  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }

  sendMessage(){
    this.webSocketAPI._send(this.name);
  }

  handleMessage(message){
    this.greeting = message;
  }
}