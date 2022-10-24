import React, {useEffect, useState} from 'react';
import {Button, Col, Form, message, Row, Space, Spin} from 'antd';
import FeildBuilder from './FeildBuilder';
import {useForm} from 'antd/lib/form/Form';
import {SubmitedFeildValue, Varing} from '../../Types/HelperTypes';
import moment from 'moment';
import {Utlity} from './libs/Helper';
import {BaseApi} from '../../api/BaseApi';
import {ConfigSchema} from '../../Types/ConfigSchema';
import {useNavigate, useParams} from "react-router-dom";
import _ from 'lodash';

function SectionEdit() {
    const [form] = useForm();
    const section: string = Utlity.getSection();
    let instance = BaseApi.getInsance();
    const [configData, setconfigData] = useState<ConfigSchema | null>(null);
    const {id} = useParams();
    const columConfig = configData?.columns;
    let dataOuter: Varing = {};
    let navigate = useNavigate();

    const onFinish = (values: any) => {
        let loading = message.loading('Saving data');
        instance.updatesectionData(section, values, id)
            .then(res => {
                loading();
                const {status} = res;
                if (status === 200) {
                    let data = res.data;
                    if (data.success === false) {
                        return new Promise((resolve, reject) => reject(data.message))
                    } else {
                        message.success(data.message, 2);
                        navigate(`/admin/${section}`);
                    }
                }
            }).catch(error => {
            message.error(error, 2);
        });
    }
    useEffect(() => {
        instance.getsectionConfig(section)
            .then(res => {
                const {data} = res;
                let {section_config} = data?.data;
                setconfigData(section_config);
            });
        instance.getsectionData(section, id)
            .then(res => {
                const {data} = res;
                let resdata = data?.data;
                resdata?.map((item: SubmitedFeildValue) => {
                    if (['date', 'time'].indexOf(item.type) === -1) {
                        dataOuter[item.field] = item.value;
                    } else {
                        dataOuter[item.field] = moment(item.value as string);
                    }
                });
                if (_.isEmpty(dataOuter)) {
                    console.log(dataOuter)
                    navigate(`/admin/${section}`);
                }
                form.setFieldsValue(dataOuter);
            })
    }, []);
    return (

        <div style={{minHeight: '525px',paddingTop:'10px'}}>
            {(columConfig && _.isEmpty(dataOuter)) && <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                initialValues={undefined}
                size={'large'}
                form={form}
                onFinish={onFinish}
            >
                {columConfig.map((config, idx) => (
                    <FeildBuilder config={config} type={config.type} key={idx}/>
                ))}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>}
            {!columConfig &&
                <Space align="center" direction="vertical">
                            <Spin size="large"  style={{
                                verticalAlign: 'middle',
                            }}/>
                </Space>
            }
        </div>
    );
}

export default SectionEdit;
