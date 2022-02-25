import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';
import{patternValidator} from '../../Validators/FormValidators'
import {Presets} from '../../Validators/ValidationHelper';
import { RuleObject } from 'antd/lib/form';
import FeildBuilder from './FeildBuilder';
import {JobSchema} from '../../Validators/ConfigValidatorJoI';
function SectionAdd() {
    const config={
        field: "title",
        type: "select",
        label: "Title",
        class: "switch",
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
            required: true,
            pattern:"^(?=.*[\\w\\d]).+"
          }
        ],
        validations_msg: [
          {
            required: "Title is required",
            pattern:"Provide valid Title"
          }
        ]
      };
      console.log(JobSchema.validate(config));
    return (
        <div>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                initialValues={{ size: '' }}
                size={'large'}
            >
                <Form.Item label="Radio" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <FeildBuilder config={config} type={'text'} />
            </Form>
        </div>
    )
}

export default SectionAdd;
