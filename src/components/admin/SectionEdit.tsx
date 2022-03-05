import React, { useState, useEffect } from 'react';
import {dataOut,datasub} from '../../Validators/ConfigValidatorAjv'
import {
    Form,
    Button,
} from 'antd';
import FeildBuilder from './FeildBuilder';
import { useForm } from 'antd/lib/form/Form';
import{Varing} from '../../Types/HelperTypes';
import moment from 'moment';
function SectionEdit() {
    const [form] =useForm()
    const cfdata= dataOut.column;
  const onFinish = (values: any) => {
    console.log('Success:', values);
  }
  useEffect(() => {
    let dataOuter:Varing={};
    const data = datasub.map(item=>{
        if(['date','time'].indexOf(item.type)===-1){
            dataOuter[item.field]=item.value;
        }else{
            dataOuter[item.field]=moment(item.value as string);
        }
    });
    form.setFieldsValue(dataOuter)

  }, [])
  return (
    <div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={undefined}
        size={'large'}
        form={form}
        onFinish={onFinish}
      >

        {cfdata.map((config,idx)=>(
          <FeildBuilder config={config} type={config.type} value={datasub[idx]}/>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
    );
}

export default SectionEdit;
