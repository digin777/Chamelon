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
function SectionAdd() {
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
                <Form.Item
                 label="Input"
                  name="size"
                  rules={[
                      {
                        required:true,
                        validator:(rule: RuleObject, value: any):Promise<any>=>{
                            return patternValidator(rule,value,Presets.EMAIL,'Must be valid email');
                        }
                      }
                  ]}
                  >
                    <Input size="large" placeholder="large size" />
                </Form.Item>
            </Form>
        </div>
    )
}

export default SectionAdd;
