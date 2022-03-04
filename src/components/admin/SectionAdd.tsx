import React, { useState } from 'react';
import {dataOut} from '../../Validators/ConfigValidatorAjv'
import {
  Form,
  Button,
} from 'antd';
import { patternValidator } from '../../Validators/FormValidators'
import { Presets } from '../../Validators/ValidationHelper';
import { RuleObject } from 'antd/lib/form';
import FeildBuilder from './FeildBuilder';
import { JobSchema } from '../../Validators/ConfigValidatorJoI';
function SectionAdd() {
  const config = {
    field: "title",
    type: "script",
    label: "config",
    class: "text",
    sortable: true,
    searchable: true,
    list: true,
    view: true,
    placeholder: "Title",
    export: true,
    source_type: "static",
    source: [
      {
        label: "Active",
        value: "active"
      },
      {
        label: "Inactive",
        value: "inactive"
      }
    ],
    validators: [
      {
        script: true
      }
    ],
    validations_msg: [
      {
        script: "Provide valid Title"
      }
    ],
  };
  const cfdata= dataOut.column;
  const onFinish = (values: any) => {
    console.log('Success:', values);
  }
  return (
    <div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: '' }}
        size={'large'}
        onFinish={onFinish}
      >

        {cfdata.map(config=>(
        <FeildBuilder config={config} type={config.type} />
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

export default SectionAdd;
