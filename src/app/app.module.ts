import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http'

import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { ChatComponent } from './chat/chat.component';
import { BotaoDecisaoComponent } from './botao-decisao/botao-decisao.component';


@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    ChatComponent,
    BotaoDecisaoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }