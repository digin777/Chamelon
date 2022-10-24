import React, {useState} from 'react'
import {Avatar, Badge, Breadcrumb, Col, Dropdown, Layout, Menu, Row, Switch,Typography } from 'antd';
import {
    AppstoreOutlined,
    BellOutlined,
    CalendarOutlined,
    DashboardOutlined,
    HomeOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    UserOutlined
} from '@ant-design/icons';
import {Outlet} from "react-router-dom";
import {CgMenuGridO} from 'react-icons/cg';
import {MdOutlineManageAccounts} from 'react-icons/md';
import {Notification, UserLogoutMenu} from './Menus/TopLogout'
import './Dashboard.css'

type iTheme = "light" | "dark" | undefined;
const { Title } = Typography;
function Dashboard() {
    const changeTheme = (value: Boolean) => {
        setTheme(value ? 'dark' : 'light');
    };
    const {SubMenu} = Menu;
    const {Header, Content, Footer, Sider} = Layout;
    const [isCollapsed, setisCollapsed] = useState(false);
    const [theme, setTheme] = useState<iTheme>('light');
    var menumargin=200;
    return (
        <div>
            <Layout>
                <Sider className={theme == 'light' ? 'site-menu-light' : 'site-menu-dark'} trigger={null} collapsible
                       collapsed={isCollapsed}
                       style={{
                           overflow: 'auto',
                           height: '100vh',
                           position: 'fixed',
                           left: 0,
                           top: 0,
                           bottom: 0,
                       }}>
                    <div className="logo">
                        <Avatar size={45} icon={<UserOutlined/>}/>
                        <Switch onChange={changeTheme}/>
                    </div>
                    <Menu theme={theme} mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<DashboardOutlined/>}>
                            Dash Board
                        </Menu.Item>
                        <Menu.Item key="2" icon={<CalendarOutlined/>}>
                            Drivers
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<SettingOutlined/>} title="Settings">
                            <Menu.Item key="3" icon={<AppstoreOutlined/>}>Sections</Menu.Item>
                            <Menu.Item key="4" icon={<CgMenuGridO size='1.3em'/>}>Menus</Menu.Item>
                            <Menu.Item key="7" icon={<MdOutlineManageAccounts size='1.3em'/>}>Roles</Menu.Item>
                            <Menu.Item key="8" icon={<MailOutlined/>}>Mail Template</Menu.Item>
                            <Menu.Item key="9" icon={<SettingOutlined/>}>Admin Settings</Menu.Item>
                            <SubMenu key="sub1-2" title="Submenu">
                                <Menu.Item key="5">Option 5</Menu.Item>
                                <Menu.Item key="6">Option 6</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: isCollapsed?80:200 }}>
                    <Header className="site-layout-background"
                            style={{padding: 0,}}>
                        <Row justify="end" style={{fontSize: "16px"}}>
                            <Col span={20} style={{justifyContent: "start"}}>
                                {React.createElement(isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: (e) => {
                                        setisCollapsed(!isCollapsed)
                                    },
                                    style: {
                                        color: "black",
                                        fontSize: "18px",
                                        lineHeight: "64px",
                                        marginLeft: "10px"
                                    }
                                })}
                            </Col>
                            <Col style={{alignContent: 'flex-end'}} span={2}>
                                <Dropdown overlay={Notification} placement="bottomLeft">

                                    <Badge dot={true}>
                                        <Avatar size="large" icon={<BellOutlined/>}/>
                                    </Badge>
                                </Dropdown>
                            </Col>
                            <Col style={{alignContent: 'flex-end'}} span={2}>
                                <Dropdown overlay={UserLogoutMenu} placement="bottomLeft">
                                    <Avatar size="large" icon={<UserOutlined/>}/>
                                </Dropdown>
                            </Col>

                        </Row>
                    </Header>

                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '10px 10px',
                            padding: '12px 24px'
                        }}
                    >
                        <Row  style={{marginTop: "10px", fontSize: "16px"}}>
                            <Col span={16} style={{justifyItems:"start",paddingLeft:"10px"}} >
                                <Title level={3}>section</Title>
                            </Col>
                            <Col span={8} style={{justifyItems:"end"}}>
                                <Breadcrumb>
                                    <Breadcrumb.Item href="/admin">
                                        <HomeOutlined/>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item href="">
                                        <UserOutlined/>
                                        <span>section</span>
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </Col>
                        </Row>
                        <Outlet/>
                    </Content>
                    <Footer style={{textAlign: 'center',paddingTop:"5px"}}>Chamelon ©{new Date().getFullYear()} Created by Digin
                        Antony</Footer>
                </Layout>
            </Layout>
        </div>
    )
}

export default Dashboard
