import { Menu, Dropdown, Button, Space, Tabs, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { LogoutOutlined, DownloadOutlined, UserOutlined } from '@ant-design/icons';
export const UserLogoutMenu = (
    <Menu>
        <Menu.Item>
            <Link to="">
                <UserOutlined /> Profile
        </Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="">
                <DownloadOutlined /> Package Manager
        </Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="">
                <LogoutOutlined /> Logout
        </Link>
        </Menu.Item>
    </Menu>
);
export const Notification = () => {
    const { TabPane } = Tabs;
    return (
        <Menu>
            <div  style={{marginLeft:'10px',marginRight:'10px'}}>
                <Tabs defaultActiveKey="1" onChange={undefined}>
                    <TabPane tab="User Notification" key="1">
                        Content of Tab Pane 1
                    </TabPane>
                    <TabPane tab="Other Notification" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                </Tabs>
            </div>
        </Menu>
    );
}