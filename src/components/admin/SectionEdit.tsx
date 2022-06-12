import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Space,
} from 'antd';
import FeildBuilder from './FeildBuilder';
import { useForm } from 'antd/lib/form/Form';
import { Varing, SubmitedFeildValue } from '../../Types/HelperTypes';
import moment from 'moment';
import { Utlity } from './libs/Helper';
import { BaseApi } from '../../api/BaseApi';
import { ConfigSchema } from '../../Types/ConfigSchema';
import { useParams } from "react-router-dom";
import { Spin } from 'antd';
function SectionEdit() {
  const [form] = useForm();
  const section: string = Utlity.getSection();
  let instance = BaseApi.getInsance();
  const [configData, setconfigData] = useState<ConfigSchema | null>(null);
  const { id } = useParams();
  const columConfig = configData?.columns;
  const onFinish = (values: any) => {
    console.log('Success:', values);
  }
  useEffect(() => {
    instance.getsectionConfig(section)
      .then(res => {
        const { data } = res;
        let { section_config } = data?.data;
        setconfigData(section_config);
      });
    let dataOuter: Varing = {};
    instance.getsectionData(section, id)
      .then(res => {
        const { data } = res;
        let resdata = data?.data;
        resdata?.map((item:SubmitedFeildValue ) => {
          if (['date', 'time'].indexOf(item.type) === -1) {
            dataOuter[item.field] = item.value;
          } else {
            dataOuter[item.field] = moment(item.value as string);
          }
        });
        form.setFieldsValue(dataOuter);
      })
  }, []);
  return (
    <div>
      {columConfig && <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={undefined}
        size={'large'}
        form={form}
        onFinish={onFinish}
      >
        {columConfig.map((config, idx) => (
          <FeildBuilder config={config} type={config.type} key={idx} />
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>}
      {!columConfig &&
        <Space align="center">
          <Spin size="large" />
        </Space>
      }
    </div>
  );
}

export default SectionEdit;
