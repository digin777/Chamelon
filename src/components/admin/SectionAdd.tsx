import React, { useState, useEffect } from 'react';
import { sectionconfig, dataOut } from '../../Validators/ConfigValidatorAjv'
import {
  Form,
  Button,
  message,
} from 'antd';
import { patternValidator } from '../../Validators/FormValidators'
import { Presets } from '../../Validators/ValidationHelper';
import { RuleObject } from 'antd/lib/form';
import FeildBuilder from './FeildBuilder';
import { JobSchema } from '../../Validators/ConfigValidatorJoI';
import { BaseApi } from '../../api/BaseApi'
import { ConfigSchema } from '../../Types/ConfigSchema'
import {Utlity} from './libs/Helper';
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
  const [configData, setconfigData] = useState<ConfigSchema | null>(null);
  let section:string = Utlity.getSection();
  let instance = BaseApi.getInsance();
  useEffect(() => {
    instance.getsectionConfig(section)
      .then(res => {
        const { data } = res;
        let { section_config } = data?.data;
        setconfigData(section_config);
      });
  }, [])

  const columconfig = configData?.columns;

  const onFinish = (values: any) => {
    let loading = message.loading('Saving data');
    // const formData = new FormData();
    // for (const name in values) {
    //   formData.append(name, values[name]); // there should be values.avatar which is a File object
    // }
    // formData.append("section",section);
    instance.addsectionData(section,values)
      .then(res => {
        loading();
        const { status } = res;
        if (status === 200) {
          let data = res.data;
          if (data.success === false) {
            return new Promise((resolve, reject) => reject(data.message))
          } else {
            message.success(data.message, 2);
          }
        }
      }).catch(error => {
        message.error(error, 2);
      })
    console.log(values)
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
        {columconfig && columconfig.map((config,idx) => (
          <FeildBuilder config={config} type={config.type} key={idx}/>
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
