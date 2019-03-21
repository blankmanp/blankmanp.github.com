interface menuType {
  path: string,
  name: string,
  icon: string
}

interface sideBarType {
  'article': Array<{ name: string, title: string, icon: string, children: Array<{ title: string, path: string }> }>,
  'game': Array<{}>,
  'demo': Array<{}>
}

const homePageMenus:Array<menuType> = [];

const menus:Array<menuType> = [
  {
    path: '/',
    name: 'home',
    icon: 'home',
  }, {
    path: '/article',
    name: 'article',
    icon: 'book',
  }, {
    path: '/game',
    name: 'game',
    icon: 'trophy'
  }, {
    path: '/demo',
    name: 'demo',
    icon: 'bulb'
  }
];

const sideBar:sideBarType = {
  article: [{
    name: '201902',
    title: '2019年02月',
    children: [
      { title: '测试', path: '/article/201902/test' }
    ],
    icon: 'book'
  }],
  game: [{
    name: 'canvas',
    title: 'canvas小游戏',
    children: [
      { title: '贪吃蛇', path: '/game/snack' }
    ]
  }],
  demo: []
};

export default { menus, sideBar };