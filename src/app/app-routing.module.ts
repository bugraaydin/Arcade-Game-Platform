import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SnakeComponent } from './snake.component';
import { FlappybirdComponent } from './flappybird.component';

const routes: Routes = [
  { path: 'snake', component: SnakeComponent},
  { path: 'flappybird', component: FlappybirdComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
