import {Component, OnInit, ElementRef} from '@angular/core';
import { Bird} from './model/bird';
import {Pipe} from './model/pipe';

@Component({
  selector: 'flappy-bird',
  templateUrl: './flappybird.component.html',
  styleUrls: ['./flappybird.component.css'],
})

export class FlappybirdComponent implements OnInit {

  public flappycanvas;
  public ctx;
  public gravity: number;
  public bird = new Bird(300,0);
  public pipe = new Pipe();
  public pipe2 = new Pipe();
  public isGameOver = false;
  public score = 0;
  // keyboard
  private event: KeyboardEvent;


  private onKeyPress(event: KeyboardEvent): void {
    if (event.key == ' ') {
      if(this.isGameOver){
        this.pipe.x = 400;
        this.pipe2.x = 650;
        this.gravity = 0.2;
        this.bird.velocity = 0;
        this.bird.y = 300;
        this.score = 0;
        this.isGameOver = false;
        return;
      }
      this.gravity = 0.2;
      this.bird.velocity -= 7;
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
    this.flappycanvas = this._elementRef.nativeElement.querySelector('#flappycanvas');
    this.ctx = this.flappycanvas.getContext('2d');
    this.flappycanvas.width = 400;
    this.flappycanvas.height = 600;
    this.ctx.fillStyle ='white';
    this.ctx.font ='40px Arial';
    this.pipe2.x = 650;
    this.gravity = 0.2;
    document.addEventListener('keydown', (event) => {
      this.onKeyPress(event);
    });
    setInterval(() => {
      this.draw();
    }, 1000/70);


  }
  draw(): void{
    if(!this.isGameOver)
      this.update();

    this.ctx.drawImage(this.getBackground(), 0,0);
    if(this.pipe.x < -100)
      this.pipe = new Pipe();
    //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    this.ctx.drawImage(this.getPipeUp(), 0, 402-this.pipe.yUp, 70, this.pipe.yUp, this.pipe.x, 0, 70, this.pipe.yUp);
    this.ctx.drawImage(this.getPipeDown(), 0,0,70,this.pipe.yDown,this.pipe.x,this.pipe.yUp + 105,70,this.pipe.yDown);
    if(this.pipe2.x < -100) {
      this.pipe2 = new Pipe();
    }
    this.ctx.drawImage(this.getPipeUp(), 0, 402-this.pipe2.yUp, 70, this.pipe2.yUp, this.pipe2.x, 0, 70, this.pipe2.yUp);
    this.ctx.drawImage(this.getPipeDown(), 0,0,70,this.pipe2.yDown,this.pipe2.x,this.pipe2.yUp + 105,70,this.pipe2.yDown);
    this.ctx.fillText(this.score,190,200);
    this.ctx.drawImage(this.getBird(), 150,this.bird.y);
  }
  update(): void{
    this.pipe.x += -3;
    this.pipe2.x += -3;
    if(this.bird.y > 431 && this.isGameOver == false) {
      this.gameOver();
    }
    //score
    if(this.pipe.x < 170 && this.pipe.x > 166 && this.isGameOver == false) {
      this.score++;
      console.log(this.score);
    }
    if(this.pipe2.x < 170 && this.pipe2.x > 166 && this.isGameOver == false) {
      this.score++;
      console.log(this.score);
    }
    //collision

    if((this.bird.y - this.pipe.yUp) < -10 && (this.pipe.x -  150) < 50 && (this.pipe.x -  150) > -25 && this.isGameOver == false) {
      this.gameOver();
    }
    if((this.bird.y - this.pipe2.yUp) < -10  && (this.pipe2.x -  150) < 50 && (this.pipe2.x -  150) > -25 && this.isGameOver == false) {
      this.gameOver();
    }
    if((this.bird.y - this.pipe.yUp - 150) > -88.5 && (this.pipe.x -  150) < 50 && (this.pipe.x -  150) > -25 && this.isGameOver == false) {
      this.gameOver();
    }
    if((this.bird.y - this.pipe2.yUp - 150) > -88.5 && (this.pipe2.x -  150) < 50 && (this.pipe2.x -  150) > -25 && this.isGameOver == false) {
      this.gameOver();
    }


    //--------------
    if(this.bird.y < -10){
      this.bird.velocity = 0;
      this.bird.y = -9;
    }
    if(this.bird.velocity < 7)
      this.bird.velocity += this.gravity*0.8;
    else
      this.bird.velocity = 7;
    if(this.bird.velocity > -7)
      this.bird.y += this.bird.velocity * 0.8;
    else
      this.bird.velocity = -7;

  }

  gameOver(): void{
      this.isGameOver = true;
  }

  getBird() {
    const image = document.createElement('IMG');
    if(this.bird.velocity > 0)
      image.setAttribute('src','assets/images/flappybird.png');
    else
      image.setAttribute('src','assets/images/flappyup.png');
    return image;
  }
  getBackground(){
    const image = document.createElement('IMG');
    image.setAttribute('src','assets/images/background.jpg');
    return image;
  }
  getPipeUp(){
    const image = document.createElement('IMG');
    image.setAttribute('src','assets/images/pipeup.png');
    return image;
  }
  getPipeDown(){
    const image = document.createElement('IMG');
    image.setAttribute('src','assets/images/pipedown.png');
    return image;
  }
}
