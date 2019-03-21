import React, { Fragment } from 'react';
// import {  } from 'antd';

export default class SnackPage extends React.Component {
  componentDidMount() {
    this.game = new SnackGame();
  }
  game: SnackGame | undefined
  render() {
    return (
      <Fragment>
        <h1>自动寻路贪吃蛇</h1>
        <canvas width="300" height="300"></canvas>
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
  constructor() {
    this.food = new Food();
    this.snack = new Snack();
  }
  init(): void { // 初始化
  }
  reset(): void { // 重置
  }
  gameover(): void { // 游戏结束
  }
  eatFood(): void { // 获取食物
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
      { x: 0, y: 0 }, // 首位为头部
      { x: 0, y: 1 },
      { x: 0, y: 2 }
    ]
  }
  body: Array<pos>
  length: number
  move():void { // 移动
  }
  grow():void { // 生长
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
  create() { // 创建食物
  }
  destroy() { // 销毁食物
  }
}