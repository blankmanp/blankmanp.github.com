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
  let paths:Array<string> = pathname.split('/');
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      {paths.length > 1 ? paths.map(item => <BreadcrumbItem key={item || 'home'}>{item || 'home'}</BreadcrumbItem>) : null}
    </Breadcrumb>
  );
}

// 侧边栏 & 头部导航
const MenuItem = Menu.Item;
const { SubMenu } = Menu;
const { menus, sideBar } = MENUDATA;

const HeaderBar: SFC<Props> = ({ location: { pathname } }) => {
  let key;
  if (pathname === '/' || !pathname) {
    key = 'home';
  } else {
    key = pathname.substring(1).split('/')[0];
  }
  return (
    <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }} defaultSelectedKeys={[key]}>
      {
        menus.map(menu => (
          <MenuItem key={menu.name}>
            <Icon type={menu.icon} style={{ paddingRight: '5px' }} />
            { pathname !== menu.path ? <Link to={menu.path} style={{ display: 'inline-block' }}>{menu.name}</Link> : menu.name }
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
  let sidebar = sideBar[name];
  let openKeys, selectedKeys;
  if (sidebar && sidebar[0]) {
    openKeys = [sidebar[0].name];
    selectedKeys = [pathname];
  }
  return (
    <Menu mode="inline" style={{ height: '100%' }} openKeys={openKeys} selectedKeys={selectedKeys}>
      {
        !name ?
        menus.map(menu => (
          <MenuItem key={menu.name}>
            <Icon type={menu.icon} style={{ paddingRight: '5px' }} />
            <Link to={menu.path} style={{ display: 'inline-block' }}>{menu.name}</Link>
          </MenuItem>
        )) : sidebar.map((item: sideBarItem) => (
          <SubMenu key={`${item.name}`} title={item.title}>
            {item.children.map(child => (
              <MenuItem key={`${child.path}`}>
                { pathname !== child.path ? <Link to={child.path}>{child.title}</Link> : child.title }
              </MenuItem>
            ))}
          </SubMenu>
        ))
      }
    </Menu>
  );
}

export { Bread, HeaderBar, SideBar };