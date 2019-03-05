import { Breadcrumb, Menu, Icon } from "antd";
import { Link } from 'react-router-dom';
import React, { SFC } from 'react';
import MENUDATA from '../router';

type Props = { location: { pathname: string } }

// 面包屑
const BreadcrumbItem = Breadcrumb.Item;
const Bread: SFC<Props> = ({ location: { pathname } }) => {
  if (pathname === '/' || !pathname) {
    pathname = '';
  }
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      {pathname.split('/').map(item => <BreadcrumbItem key={item || 'home'}>{item || 'home'}</BreadcrumbItem>)}
    </Breadcrumb>
  );
}

// 侧边栏 & 头部导航
const MenuItem = Menu.Item;
const { SubMenu } = Menu;
const { menus, sideBar } = MENUDATA;

const HeaderBar: SFC<Props> = ({ location: { pathname } }) => {
  if (pathname === '/' || !pathname) {
    pathname = 'home';
  } else {
    pathname = pathname.substring(1).split('/')[0];
  }
  return (
    <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }} defaultSelectedKeys={[pathname]}>
      {
        menus.map(menu => (
          <MenuItem key={menu.name}>
            <Icon type={menu.icon} style={{ paddingRight: '5px' }} />
            <Link to={menu.path} style={{ display: 'inline-block' }}>{menu.name}</Link>
          </MenuItem>
        ))
      }
    </Menu>
  );
}

interface sideBarItem {
  name: string,
  title: string,
  icon: string,
  children: Array<{ title: string, path: string }>
}
const SideBar: SFC<Props> = ({ location: { pathname } }) => {
  let name = pathname.substring(1).split('/')[0];
  return (
    <Menu mode="inline" style={{ height: '100%' }}>
      {
        !name ?
        menus.map(menu => (
          <MenuItem key={menu.name}>
            <Icon type={menu.icon} style={{ paddingRight: '5px' }} />
            <Link to={menu.path} style={{ display: 'inline-block' }}>{menu.name}</Link>
          </MenuItem>
        )) : sideBar[name].map((item: sideBarItem) => (
          <SubMenu key={`${item.name}`} title={item.title}>
            {item.children.map(child => (
              <MenuItem key={`${item.name}_${child.title}`}>
                <Link to={child.path}>{child.title}</Link>
              </MenuItem>
            ))}
          </SubMenu>
        ))
      }
    </Menu>
  );
}

export { Bread, HeaderBar, SideBar };