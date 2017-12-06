export class Pipe {
  x:number;
  yUp: number;
  yDown: number;
 //480
  constructor(){
    this.x = 400;
    this.yUp = this.randomIntFromInterval(80,320);
    this.yDown = 484 - 105 - this.yUp;
  }

  randomIntFromInterval(min: number,max: number): number{
    return Math.floor(Math.random()*(max-min+1)+min);
  }
}
