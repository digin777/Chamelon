import React, { useEffect, useState } from 'react'
import { Table, Row, Col, Space, Button, Popconfirm, Input, TablePaginationConfig, message } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import './Section.css'
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';
import { RandomSelect } from './libs/Helper';
type DataInput = {
    name: String,
    age: Number,
    address: String,
    key: Number
}
const data: Array<DataInput> = [];
function Section() {
    function onChange(pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any, extra: any) {
        const { column, order, field, columnKey } = sorter;
        if (order) {
            state?.data?.sort((a, b) => {
                let datarandom = [1, -1]
                return RandomSelect<number>(datarandom);
            })
            console.log('sort called')
        }
        const { current, pageSize } = pagination;
        console.log(pagination, sorter)
        if (current && current !== state.current) {
            setstate({ ...state, isloading: true, current: current, pageSize: pageSize })
        }
    }
    function deleter(id: number): Promise<any> {
        const data = state?.data?.filter(x => x.id !== id)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let num =RandomSelect<number>([1,0]);
                if(num===1)
                    resolve(data);
                else
                    reject('error')
            }, 2000);
        })

    }
    function deleteConfirm(id: number) {
        let hidedelete = message.loading('Deleting..', 0)
        deleter(id).then(
            (data) => {
                hidedelete();
                setstate({ ...state, data: data });
                message.success('sucessfully deleted', 2.5);
            })
            .catch((err)=>{
                hidedelete();
                message.error('Delete failed',2.5);
            })
    }
    function searchChange(text:string){
       // console.log(text);
    }

    type stateType = {
        isloading?: boolean;
        data?: any[];
        current?: number;
        pageSize?: number;
    }
    const [state, setstate] = useState<stateType>({ isloading: true, data: [], current: 1, pageSize: 10 })
    const { Search } = Input;
    const { pathname } = useLocation();
    const columns = [
        {
            title: 'Full Name',
            width: 100,
            dataIndex: 'userId',
            key: 'userId',
            // fixed: "left",
        },
        {
            title: 'Age',
            width: 100,
            dataIndex: 'title',
            key: 'title',
            sorter: true
            // fixed: "left",
        },
        {
            title: 'completed',
            dataIndex: 'completed',
            key: '1',
            width: 150,
            sorter: true
            //fixed: "left"
        },
        {
            title: 'Action',
            key: 'operation',
            width: 100,
            // fixed: "left",
            render: (text: any, record: any, index: number) => {
                //console.log(text,record,index)
                return (
                    <Space>
                        <Link to="/admin/section/edit"><Button ><EditOutlined /></Button></Link>
                        <Link to="/admin/section/view"><Button><EyeOutlined /></Button></Link>
                        <Popconfirm title={`Are you sure delete this Record? ${record.id}`}
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => deleteConfirm(text.id)}
                        >
                            <Button><DeleteOutlined /></Button>
                        </Popconfirm>
                    </Space>)
            },
        }];

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/todos/?_page=${state.current}&_limit=${state.pageSize}`)
            .then(response => response.json())
            .then(json => {
                setstate({ ...state, data: json, isloading: false });
            })
    }, [state.current, state.pageSize])
    return (
        <div >
            <Row justify="end" style={{ marginBottom: "10px" }}>
                <Col span={6}>
                    <Search
                        placeholder="Enter keyword to Search"
                        allowClear
                        size="large"
                        enterButton
                        onChange={(e)=>searchChange(e.target.value)}
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
                    dataSource={state.data}
                    scroll={{ x: 1240 }}
                    bordered={true}
                    onChange={onChange}
                    loading={state.isloading}
                    pagination={{
                        pageSize: state.pageSize,
                        total: 200
                    }}
                />
            </Row>
        </div>
    )
}

export default Section
