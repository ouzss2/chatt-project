import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketAPI } from './Models/WebSocketAPI ';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatt-app';
 
  handleMessage(message){
    //this.greeting = message;
  }
}
