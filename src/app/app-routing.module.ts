import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ConnectComponent } from './connect/connect.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  {path:"",component:ConnectComponent},
  {path:"connect",component:RoomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
