import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/snake" routerLinkActive="active">Snake Game</a>
      <a routerLink="/flappybird" routerLinkActive="active">Flappy Bird Game</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Developed by Buğra Aydın';
}
