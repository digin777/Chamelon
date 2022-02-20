import React, { useState } from 'react'
import {
     Layout, Menu, Row, Col, Dropdown, Breadcrumb, Avatar, Switch, Button,
    Badge } from 'antd';
import {
    UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, CalendarOutlined,
    MailOutlined, AppstoreOutlined, SettingOutlined, PlusOutlined, DashboardOutlined, BellOutlined
} from '@ant-design/icons';
import {
    Route, Routes, Outlet
} from "react-router-dom";
import { UserLogoutMenu } from './Menus/TopLogout'
import './Dashboard.css'
type iTheme = "light" | "dark" | undefined;
function Dashboard() {
    const changeTheme = (value: Boolean) => {
        setTheme(value ? 'dark' : 'light');
    };
    const { SubMenu } = Menu;
    const { Header, Content, Footer, Sider } = Layout;
    const [isCollapsed, setisCollapsed] = useState(false);
    const [theme, setTheme] = useState<iTheme>('light');

    return (
        <div>
            <Layout >
                <Sider className={theme == 'light' ? 'site-menu-light' : 'site-menu-dark'} trigger={null} collapsible collapsed={isCollapsed}>
                    <div className="logo" >
                        <Avatar size={45} icon={<UserOutlined />} />
                        <Switch onChange={changeTheme} />
                    </div>
                    <Menu theme={theme} mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<DashboardOutlined />}>
                            Dash Board
                        </Menu.Item>
                        <Menu.Item key="2" icon={<CalendarOutlined />}>
                            Drivers
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Settings">
                            <Menu.Item key="3">Option 3</Menu.Item>
                            <Menu.Item key="4">Option 4</Menu.Item>
                            <SubMenu key="sub1-2" title="Submenu">
                                <Menu.Item key="5">Option 5</Menu.Item>
                                <Menu.Item key="6">Option 6</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<SettingOutlined />} title="Navigation Three">
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        <Row justify="end" style={{ fontSize: "16px" }}>
                            <Col span={20} style={{ justifyContent: "start" }}>
                                {React.createElement(isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: (e) => { setisCollapsed(!isCollapsed) },
                                    style: {
                                        color: "black",
                                        fontSize: "18px",
                                        lineHeight: "64px",
                                        marginLeft: "10px"
                                    }
                                })}
                            </Col>
                            <Col style={{ alignContent: 'flex-end' }} span={2} >
                                <Dropdown overlay={UserLogoutMenu} placement="bottomLeft">

                                    <Badge dot={true}>
                                        <Avatar  size="large" icon={<BellOutlined />} />
                                    </Badge>
                                </Dropdown>
                            </Col>
                            <Col style={{ alignContent: 'flex-end' }} span={2} >
                                <Dropdown overlay={UserLogoutMenu} placement="bottomLeft">
                                    <Avatar size="large" icon={<UserOutlined />} />
                                </Dropdown>
                            </Col>

                        </Row>
                    </Header>
                    <Row justify="end" style={{ marginTop: "10px", fontSize: "16px" }}>
                        <Col span={2} >
                            <Breadcrumb>
                                <Breadcrumb.Item href="/admin">
                                    <HomeOutlined />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="">
                                    <UserOutlined />
                                    <span>section</span>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: '80vh',
                        }}
                    >
                        <Outlet />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Chamelon ©{new Date().getFullYear()} Created by Digin Antony</Footer>
                </Layout>
            </Layout>
        </div>
    )
}

export default Dashboard
