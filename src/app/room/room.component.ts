import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { WebSocketAPI } from '../Models/WebSocketAPI ';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  MessagesSent:any[]
  Messagesreceived:any[]
  Connected_People:any[]
  greeting: any;
  name: string;
  userconnectednow
  sendername
  
  constructor(private router: ActivatedRoute,private service:MessageService,){}

  ngOnInit(): void {
    this.router.params.subscribe(res=>{
     // console.log(res["usename"]);
      this.userconnectednow = res["usename"];
      this.sendername=res["usename"];
    })
   // this.userconnectednow=this.router.snapshot.data;
    this.Retrieve();
    


    //Get Connected Users 
    this.service.GetConnectedUsers("Connected").subscribe(res=>{
      this.Connected_People=res;
    })
  }

  sendMessage(){
    this.MessagesSent =this.service.MessageSent;
    this.service._send({content:this.name,sender:this.sendername,receiver:this.userconnectednow});
    
    setTimeout (() => {
      this.Retrieve();
   }, 100);
  }

  handleMessage(message){
    this.greeting = message;
  }

  Retrieve(){
    this.service._GetAllMessages(this.userconnectednow,this.sendername).subscribe(
      res=>{
      console.log(res);
      this.MessagesSent=res;
      }
    )
  }

  ChangeData(name){
    this.userconnectednow=name
    this.Retrieve();
  }
}
