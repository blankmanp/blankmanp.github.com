import React, { Fragment } from 'react';

const unit:number = 10;

const event = {
  on(name: string, func):void {
    if (this.funcMap[name]) {
      this.funcMap[name].push(func);
    } else {
      this.funcMap[name] = [func];
    }
  },
  emit(...args):void {
    let name = args[0];
    args.splice(0, 1); // 删除第一项
    if (this.funcMap[name]) {
      for (let i = 0; i < this.funcMap[name].length; i++) {
        this.funcMap[name][i](args); // 调用时传入参数，框架级pub/sub不考虑this指向问题，业务方自己去bind
      }
    }
  },
  off(name:string):void {
    if (!this.funcMap[name]) {
      return;
    }
    this.funcMap[name] = [];
  },
  funcMap: {}
};

export default class SnackPage extends React.Component {
  gameWidth: number
  gameHeight: number
  myref: React.RefObject<HTMLCanvasElement>
  game: SnackGame
  constructor(props) {
    super(props);
    this.gameWidth = 300;
    this.gameHeight = 300;
    this.myref = React.createRef()
    this.game = new SnackGame({ width: this.gameWidth, height: this.gameHeight });
  }
  componentDidMount() {
    this.game.init(this.myref.current);
  }
  render() {
    return (
      <Fragment>
        <h1>自动寻路贪吃蛇</h1>
        <canvas style={{ border: '1px solid #ccc', backgroundColor: '#ccc' }} ref={this.myref} width={this.gameWidth} height={this.gameHeight}></canvas>
      </Fragment>
    );
  }
}

type pos = {
  x: number,
  y: number
}

class SnackGame {
  food: Food
  snack: Snack
  width: number
  height: number
  canvas: HTMLCanvasElement | null
  constructor(props: { width: number, height: number }) {
    this.food = new Food();
    this.snack = new Snack();
    this.width = props.width;
    this.height = props.width;
    this.canvas = null;
  }
  init(canvas: HTMLCanvasElement | null): void { // 初始化
    this.canvas = canvas;
    // 注册事件
    event.on('drawfood', this.drawFood.bind(this));
    event.on('drawSnack', this.drawSnack.bind(this));

    // 绘制第一屏
    this.snack.create();
    this.createFood(true);

    // 开始动画
    this.animation();
  }
  clear() {
    if (!this.canvas) return;
    let ctx: CanvasRenderingContext2D | null = this.canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, this.width, this.height);
  }
  createFood(isNew:boolean = false):void {
    let prevFoodPos = this.food.pos;
    if (isNew) {
      do {
        this.food.create(true);
      } while (
        this.snack.body.indexOf(this.food.pos) !== -1
        || (prevFoodPos.x === this.food.pos.x && prevFoodPos.y === this.food.pos.y)
      );
    } else {
      this.food.create();
    }
  }
  drawFood() {
    if (!this.canvas) {
      return;
    }
    let { x, y } = this.food.pos;
    if (isNaN(+x) || isNaN(+y)) {
      return;
    }
    // 开始画食物
    let ctx: CanvasRenderingContext2D | null = this.canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.fillStyle = '#333';
    ctx.fillRect(x * unit, y * unit, unit, unit);
  }
  drawSnack() {
    if (!this.canvas) {
      return;
    }
    let snackBody: Array<{x: number, y: number}> = this.snack ? this.snack.body : [];
    if (snackBody.length === 0) {
      return;
    }
    let ctx: CanvasRenderingContext2D | null = this.canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.fillStyle = "#333";
    // 头
    let head: { x: number, y: number } = snackBody[0];
    ctx.beginPath();
    ctx.arc(head.x * unit + 5, head.y * unit + 5, 5, 0, 2 * Math.PI);
    ctx.stroke();

    // body
    // let body: Array<{ x: number, y: number }> = snackBody.splice(1, snackBody.length - 1);
    for (let i = 1; i < snackBody.length; i ++) {
      let pos = snackBody[i];
      ctx && ctx.strokeRect(pos.x * unit, pos.y * unit, 10, 10);
    }
  }
  reset(): void { // 重置
    this.clear();
    this.snack.reset();
    this.food.create();
  }
  gameover(): void { // 游戏结束
    alert("game over!");
    this.reset();
  }
  animation() {
    // 更新蛇的位置
    this.snack.move();
    // 判断游戏是否结束 - 蛇碰到边界 or 碰到自己
    let isDead:boolean = false;
    let { x, y } = this.snack.body[0];
    if (x < 0 || x > 30 || y < 0 || y > 30) {
      isDead = true;
    }
    if (this.snack.body.indexOf({ x, y }) > 0) {
      isDead = true;
    }
    if (isDead) {
      // 如果结束则调用gameover
      this.gameover();
      return;
    }
    // 判断是否吃到食物
    let eatenFood = x === this.food.pos.x && y === this.food.pos.y;
    if (eatenFood) {
      // 如果吃到则销毁食物
      this.food.destroy();
      // 蛇的长度+1
      this.snack.grow();
    }
    // 清除屏幕
    this.clear();
    // 绘画下一帧
    this.createFood(eatenFood);
    this.snack.create();
    eatenFood && this.food.create();
    window.requestAnimationFrame(this.animation.bind(this));
  }
  score(): void { // 计分
  }
  refresh(): void { // 动画刷新
  }
}

class Snack {
  constructor() {
    this.length = 3;
    this.body = [
      { x: 14.5, y: 2 }, // 首位为头部
      { x: 14.5, y: 1 },
      { x: 14.5, y: 0 },
    ]
    this.direction = 2;
  }
  body: Array<pos>
  length: number
  direction: 1 | 2 | 3 | 4 // 1 - 上 2 - 下 3 - 左 4 - 右
  move():void { // 移动
    switch (this.direction) {
      case 1:
        this.body = this.body.map(pos => ({ x: pos.x, y: pos.y - 1 }));
        break;
      case 2:
        this.body = this.body.map(pos => ({ x: pos.x, y: pos.y + 1 }));
        break;
      case 3:
        this.body = this.body.map(pos => ({ x: pos.x - 1, y: pos.y }));
        break;
      case 4:
        this.body = this.body.map(pos => ({ x: pos.x + 1, y: pos.y }));
        break;
      default:
        break;
    }
    event.emit('moveSnack');
  }
  grow():void { // 生长
  }
  create():void {
    event.emit('drawSnack');
  }
  reset():void {
    this.body = [
      { x: 14.5, y: 2 }, // 首位为头部
      { x: 14.5, y: 1 },
      { x: 14.5, y: 0 },
    ];
    this.direction = 2;
    this.length = 3;
    this.create();
  }
}

class Food {
  constructor() {
    this.pos = {
      x: 0,
      y: 0
    };
  }
  pos: pos
  randomPos(width: number, height: number):{x: number, y: number} {
    let nowX, nowY;
    nowX = Math.floor(Math.random() * width);
    nowY = Math.floor(Math.random() * height);
    return { x: nowX, y: nowY };
  }
  create(isNew:boolean = false) { // 创建食物
    isNew && (this.pos = this.randomPos(30, 30));
    event.emit('drawfood');
  }
  destroy() { // 销毁食物
  }
}