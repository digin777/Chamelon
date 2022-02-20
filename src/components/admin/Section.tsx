import React, { useEffect } from 'react'
import { Table, Row, Col, Space, Button, Popconfirm, Input } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import{Link,useLocation } from 'react-router-dom';
import './Section.css'
type DataInput = {
    name: String,
    age: Number,
    address: String,
    key: Number
}
const data: Array<DataInput> = [];

for (let i: number = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}
function Section() {
    const { Search } = Input;
    const {pathname} = useLocation();
    const columns = [
        {
            title: 'Full Name',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            // fixed: "left",
        },
        {
            title: 'Age',
            width: 100,
            dataIndex: 'age',
            key: 'age',
            // fixed: "left",
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: '1',
            width: 150,
            //fixed: "left"
        },
        {
            title: 'Action',
            key: 'operation',
            width: 100,
            // fixed: "left",
            render: () => (
                <Space>
                    <Button ><EditOutlined /></Button>
                    <Button><EyeOutlined /></Button>
                    <Popconfirm title="Are you sure delete this Record?" okText="Yes" cancelText="No">
                        <Button><DeleteOutlined /></Button>
                    </Popconfirm>
                </Space>),
        }];


    return (
        <div >
            <Row justify="end" style={{ marginBottom: "10px" }}>
                <Col span={6}>
                    <Search
                        placeholder="Enter keyword to Search"
                        allowClear
                        size="large"
                        enterButton
                    />

                </Col>
                <Col span={2}>
                    <Link to={`${pathname}/add`}>
                    <Button type="primary" icon={<PlusOutlined />} size={'large'}>
                        Add
                            </Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 1240 }}
                    bordered={true}
                />
            </Row>
        </div>
    )
}

export default Section
