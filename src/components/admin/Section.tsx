import React, {useEffect, useState} from 'react'
import {Button, Col, Input, message, Pagination, Popconfirm, Row, Space, Table, TablePaginationConfig} from 'antd';
import {DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined} from '@ant-design/icons';
import {Link, useLocation} from 'react-router-dom';
import type {UploadFile} from 'antd/es/upload/interface';
import './Section.css'
import {FilterValue} from 'antd/lib/table/interface';
import {RandomSelect} from './libs/Helper';
import {BaseApi} from './../../api/BaseApi'
import {Columns} from '../../Types/ConfigSchema';


function Section() {
    var isLoaded: boolean = true;
    let instance = BaseApi.getInsance();
    const location = useLocation();

    function getSection(): string {
        let currentLocation = location.pathname;
        return currentLocation.split("/")[2];
    }

    const section: string = getSection();

    function onChange(pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any, extra: any) {
        const {action}: { action: string } = extra;
        if (action == 'sort') {
            var {order, field} = sorter;
            if (!order) {
                field = '_id';
                order = 'ascend'
            }
            setstate({...state,isloading:true});
            instance.Search(section, {field, order}, {limit: state.pageSize, page: state.current},state.text)
                .then(res => {
                    if (res.success)
                        setstate({...state, data: res.data, sort: {field, order},isloading:false});
                })
        } else if (action == 'paginate') {
            const {current: page, pageSize: limit} = pagination;
            const {sort} = state;
            instance.getSectionSort(section, sort, {limit, page})
                .then(res => {
                    if (res.success)
                        setstate({...state, data: res.data, current: page, pageSize: limit});
                })
        }
    }

    function OnChangePaginate(page: number, limit: number) {
        const {sort,text} = state;
        setstate({...state,isloading:true});
        instance.Search(section, sort, {limit, page},text)
            .then(res => {
                if (res.success)
                    setstate({...state, data: res.data, current: page, pageSize: limit,isloading:false});
            })
    }

    function createColumnConfig(columns: Columns[]): any[] {
        var out: any[] = columns.map(element => {
            var obj: any = {
                title: element.label,
                width: 100,
                dataIndex: element.field,
                key: element.field,
                align: "center",
                sorter: element.sortable,
            };
            if (element.type == 'switch') {
                obj = {
                    ...obj,
                    render: (text: any, record: any, index: number) => {
                        return <span>{typeof text == 'boolean' ? JSON.stringify(text) : text}</span>
                    }
                }
            } else if (element.type == 'upload') {
                obj = {
                    ...obj,
                    render: (colvalue: any, record: any, index: number) => {
                        const files: UploadFile[] = colvalue.fileList
                        var Images: any = []
                        files.map(file => {
                            if (file.type?.includes('image')) {
                                Images.push(<img src={file.url} style={{width: "60px", height: "60px"}}></img>)
                            } else {
                                Images.push(<>{file.name}</>)
                            }
                        })

                        return Images;
                    }
                }
            }
            if(element.relation) {
                let {displayField} = element.relation;
                obj = {
                    ...obj,
                    render: (text: any, record: any, index: number) => {
                        return <>{text[displayField]}</>
                    }
                }
            }
            return obj;
        });
        const actionConfig = {
            title: 'Action',
            key: 'operation',
            width: 185,
            align: "center",
            fixed: "right",
            render: (text: any, record: any, index: number) => {
                const {_id: id} = record;
                return (
                    <Space>
                        <Link to={`/admin/${section}/${id}/edit`}><Button><EditOutlined/></Button></Link>
                        <Link to={`/admin/${section}/${id}/view`}><Button><EyeOutlined/></Button></Link>
                        <Popconfirm title={`Are you sure delete this Record? ${id}`}
                                    okText="Yes"
                                    cancelText="No"
                                    onConfirm={() => deleteConfirm(id)}
                        >
                            <Button><DeleteOutlined/></Button>
                        </Popconfirm>
                    </Space>)
            },
        };
        out.push(actionConfig)
        return out;
    }

    function deleter(id: number): Promise<any> {
        const data = state?.data?.filter(x => x.id !== id)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let num = RandomSelect<number>([1, 0]);
                if (num === 1)
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
                setstate({...state, data: data});
                message.success('sucessfully deleted', 2.5);
            })
            .catch((err) => {
                hidedelete();
                message.error('Delete failed', 2.5);
            })
    }

    function searchChange(text: string) {
        // console.log(text);
    }

    function rowRender(text: any, record: any, index: any) {
        console.log(typeof record, record)
        return <>{text}</>
    }


    type stateType = {
        isloading?: boolean;
        data?: any[];
        current?: number;
        pageSize?: number;
        total?: number;
        columns: any[];
        sort: { field: string, order: string }
        isPaginate: boolean;
        text:string
    };
    const [state, setstate] = useState<stateType>(
        {
            isloading: true,
            data: [],
            current: 1,
            isPaginate: true,
            pageSize: 10,
            columns: [],
            sort: {field: '_id', order: 'ascend'},
            text: ""
        }
    );
    const {Search} = Input;
    const {pathname} = useLocation();
    const handleSearch = (text: string, e: any) => {
        setstate({...state,isloading:true});
        instance.Search(section, state.sort, {limit: state.pageSize, page:1}, text)
            .then(res => {
                if (res.success)
                    setstate({...state, data: res.data,text,current:1,isloading:false});
            })
    }
    useEffect(() => {
        if (isLoaded) {
            instance.getSectionIndexConfig(section)
                .then(({data}) => {
                    var {columns, pagination, per_pagecount}:
                        { columns: Columns[], pagination: boolean, per_pagecount: number } = data.data;
                    const ColumnConfig = createColumnConfig(columns);
                    instance.getsectionDataList(section, state.current, state.pageSize)
                        .then(result => {
                            const {data, count} = result.data;
                            isLoaded = !isLoaded;
                            setstate({
                                ...state,
                                data: data,
                                columns: ColumnConfig,
                                isloading: false,
                                pageSize: per_pagecount,
                                total: count,
                                isPaginate: pagination
                            });
                        });
                });
        }
    }, [])
    return (
        <div>
            <Row justify="end" style={{marginBottom: "10px"}}>
                <Col span={6}>
                    <Search
                        placeholder="Enter keyword to Search"
                        allowClear
                        size="large"
                        enterButton
                        onChange={(e) => searchChange(e.target.value)}
                        onSearch={handleSearch}
                    />
                </Col>
                <Col span={2}>
                    <Link to={`${pathname}/add`}>
                        <Button type="primary" icon={<PlusOutlined/>} size={'large'}>
                            Add
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Table style={{minHeight: '480px'}}
                   size="middle"
                   columns={state.columns}
                   dataSource={state.data}
                   scroll={{x: 80, y: 420}}
                   bordered={true}
                   onChange={onChange}
                   loading={state.isloading}
                   pagination={false}
            />
            <Row>
                <Pagination style={{marginTop: "10px"}} pageSize={state.pageSize} total={200}
                            onChange={OnChangePaginate} current={state.current}/>
            </Row>
        </div>

    )
}

export default Section
