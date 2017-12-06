import {Component, OnInit, ElementRef} from '@angular/core';
import { Point} from './model/point';
import {log} from 'util';


@Component({
  selector: 'my-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css'],
})

export class SnakeComponent implements OnInit {

  public headX: number;
  public headY: number;
  public tc: number;
  public baitX: number;
  public baitY: number;
  public snakeSize: number;
  public xvelocity = 0;
  public yvelocity = 0;
  public canvas;
  public ctx;
  public tail: number;
  public pointList: Point[] = [];

  // keyboard
  public key: string;
  private event: KeyboardEvent;

  private onKeyPress(event: KeyboardEvent): void {
    this.key = event.key;
    if (event.key == ' ') {
      this.key = 'BackSpace';
    }
    switch (event.key) {
      case ' ':
        this.xvelocity = 0;
        this.yvelocity = 0;
        break;
      case 'ArrowLeft':
        if(this.xvelocity == 1 && this.yvelocity == 0)
          break;
        this.xvelocity = -1;
        this.yvelocity = 0;
        break;
      case 'ArrowUp':
        if(this.xvelocity == 0 && this.yvelocity == 1)
          break;
        this.xvelocity = 0;
        this.yvelocity = -1;
        break;
      case 'ArrowRight':
        if(this.xvelocity == -1 && this.yvelocity == 0)
          break;
        this.xvelocity = 1;
        this.yvelocity = 0;
        break;
      case 'ArrowDown':
        if(this.xvelocity == 0 && this.yvelocity == -1)
          break;
        this.xvelocity = 0;
        this.yvelocity = 1;
        break;
    }
  }

  private onEvent(event: KeyboardEvent): void {
    this.event = event;
  }

  //// keyboard end

  constructor(private _elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.createCanvas();
  }

  createCanvas(): void {
    this.canvas = this._elementRef.nativeElement.querySelector('#canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 400;
    this.canvas.height = 400;
    this.headX = 10;
    this.headY = 10;
    this.snakeSize = 20;
    this.tc = 20;
    this.baitX = 2;
    this.baitY = 2;
    this.tail = 3;
    this.pointList.push({x: this.headX, y: this.headY});
    document.addEventListener('keydown', (event) => {
      this.onKeyPress(event);
    });
    setInterval(() => {
      this.game();
    }, 1000/8);


  }

  game(): void {
    this.snakeMovement();
    this.ctx.fillStyle = 'gray';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.collision();
    if(this.xvelocity == 1 || this.yvelocity == 1 || this.xvelocity == -1 || this.yvelocity == -1) {
      this.pointList.push({x: this.headX, y: this.headY});
      while (this.pointList.length > this.tail) {
        this.pointList.shift();
      }
    }

    this.baitSpawn();

  }

  snakeMovement(): void {
    this.headX += this.xvelocity;
    this.headY += this.yvelocity;
    if (this.headX < 0) {
      this.headX = this.tc - 1;
    }
    if (this.headX > this.tc - 1) {
      this.headX = 0;
    }
    if (this.headY < 0) {
      this.headY = this.tc - 1;
    }
    if (this.headY > this.tc - 1) {
      this.headY = 0;
    }
  }

  baitSpawn(): void {
    if (this.baitX == this.headX && this.baitY == this.headY) {
      this.tail++;
        let flag = false;
        do{
          this.baitX = Math.floor(Math.random() * this.tc);
          this.baitY = Math.floor(Math.random() * this.tc);
          for(let i = 0; i < this.pointList.length; i++){
            if(this.pointList[i].x === this.baitX && this.pointList[i].y === this.baitY) {
              flag = false;
              break;
            }
            else
              flag = true;
          }
        }while(flag === false);

    }
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.baitX * this.snakeSize, this.baitY * this.snakeSize, this.snakeSize - 2, this.snakeSize - 2);

  }
  collision(): void{
    this.ctx.fillStyle = 'black';
    for(let i = 0; i < this.pointList.length;i++){
      if(i == this.pointList.length - 1)
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.pointList[i].x*this.snakeSize,this.pointList[i].y*this.snakeSize,this.snakeSize-2,this.snakeSize-2);
        if(this.pointList[i].x == this.headX && this.pointList[i].y == this.headY) {
          if(this.xvelocity == 0 && this.yvelocity == 0)
            break;
          this.tail = 3;
        }
    }
  }

}
