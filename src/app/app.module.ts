import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SnakeComponent } from './snake.component';
import { FlappybirdComponent } from './flappybird.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    SnakeComponent,
    FlappybirdComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
