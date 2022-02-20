import { Menu, Dropdown, Button, Space } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { LogoutOutlined, DownloadOutlined } from '@ant-design/icons';
export const UserLogoutMenu = (
    <Menu>
        <Menu.Item>
            <Link to="">
            <LogoutOutlined /> Logout
        </Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="">
            <DownloadOutlined /> Package Manager
        </Link>
        </Menu.Item>
    </Menu>
);