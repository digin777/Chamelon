import React from 'react'
import { Input, Select, Radio, Space, AutoComplete, Checkbox, DatePicker, InputNumber, Slider, Switch, TimePicker, Button, Upload } from 'antd';
import { Columns } from '../../Types/ConfigSchema';
import { OptionItem } from './SuportElements'
import Column from 'antd/lib/table/Column';
import { DefaultOptionType } from 'antd/lib/select';
import TextArea from 'antd/lib/input/TextArea';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-dracula";
import 'ace-builds/src-noconflict/snippets/json'
import{SubmitedFeildValue} from '../../Types/HelperTypes'
import { CheckOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons';
import Uploader from './Molecules/Uploader';
export interface feildprops {
    type?: String;
    rest?: any
    placeholder?: string
    submitedValue?:SubmitedFeildValue;
};
type Item = {
    value: String;
    label: any;
};
function Feild(props: feildprops) {
    const { type, placeholder,submitedValue } = props;
    const value=submitedValue?.value;
    switch (type) {
        case 'text':
            return (
                <Input placeholder={placeholder}  />
            )
            break;
        case 'select':
            return (<Select
                placeholder={placeholder}
                onChange={undefined}
                allowClear
            >
                {getOptions(props.rest, 'radio')}
            </Select>);
            break
        case 'multiselect':
            return (<Select
                mode="multiple"
                placeholder={placeholder}
                onChange={undefined}
                allowClear
                {...props.rest.additonal}
            >
                {getOptions(props.rest, 'radio')}
            </Select>);
            break
        case 'radio':
            return (<Radio.Group
                onChange={undefined}
            >
                <Space direction="vertical">
                    {getOptions(props.rest, 'radio')}
                </Space>
            </Radio.Group>);
            break;
        case 'autocomplete':
            return (<AutoComplete
                dropdownMatchSelectWidth={252}
                options={getOptionAuto(props.rest, 'auto')}
                onSelect={undefined}
                onSearch={undefined}
            >
                <Input size="large" placeholder={placeholder} />
            </AutoComplete>);
            break;
        case 'checkbox':
            return (
                <Checkbox.Group onChange={undefined}>
                    <Space direction="vertical">
                        {getOptions(props.rest, 'checkbox')}
                    </Space>
                </Checkbox.Group>);
        case 'date':
            return (
                <DatePicker onChange={undefined} />
            );
        case 'password':
            return (<Input.Password placeholder={placeholder} />);
            break;
        case 'textarea':
            return (<TextArea showCount maxLength={undefined} onChange={undefined} />);
            break;
        case 'numberinput':
            return (<InputNumber onChange={undefined} />);
            break;
        case 'slider':
            return (<Slider />);
            break;
        case 'switch':
            return (<Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
            />);
            break;
        case 'time':
            return (<TimePicker onChange={undefined} />);
            break;
        case 'upload':
            return (
                // <Upload >
                //     <Button icon={<UploadOutlined />}>{props.placeholder}</Button>
                // </Upload>
                <Uploader placeholder={placeholder} rest={props.rest}/>
            );
            break;
        case 'script':
            return (
                <AceEditor
                    placeholder=""
                    mode="json"
                    theme="dracula"
                    name="blah2"
                    onLoad={undefined}
                    onChange={undefined}
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    enableLiveAutocompletion={true}
                    enableSnippets={true}
                />
            );
            break;
        default:
            return <>{"unable to find input type"}</>
            break;
    }

}
export default Feild;
function getOptionAuto(column: Columns, type?: string) {
    switch (column.source_type) {
        case 'static':
            if (type === 'auto') {
                return (

                    column?.source?.map(item => (
                        OptionItem({ value: item.value, label: item.label })
                    )
                    ) as DefaultOptionType[]
                );
            }
            break;
        case 'dynamic':
            const data = [{ label: "dd", value: "sad" }];
            if (type === 'auto') {
                return (

                    column?.source?.map(item => (
                        OptionItem({ value: item.value, label: item.label })
                    )
                    ) as DefaultOptionType[]
                );
            }
    }
}
function getOptions(column: Columns, type?: string) {

    const { Option } = Select;
    // column?.source?.map
    switch (column.source_type) {
        case 'static':
            if (type === 'option') {
                return (
                    <>
                        {column?.source?.map(item => (
                            <Option value={item.value}>{item.label}</Option>)
                        )}
                    </>);
            } else if (type === 'radio') {
                return (
                    <>
                        {column?.source?.map(item => (
                            <Radio value={item.value}>{item.label}</Radio>)
                        )}
                    </>);
            } else if (type === 'checkbox') {
                return (
                    <>
                        {column?.source?.map(item => (
                            <Checkbox value={item.value}>{item.label}</Checkbox>)
                        )}
                    </>);
            }
            break;
        case 'dynamic':
            const data = [{ label: "dd", value: "sad" }]
            if (type === 'option') {
                return (
                    <>
                        {data.map(item => (
                            <Option value={item.value}>{item.label}</Option>)
                        )}
                    </>);
            } else if (type === 'radio') {
                return (
                    <>
                        {column?.source?.map(item => (
                            <Radio value={item.value}>{item.label}</Radio>)
                        )}
                    </>);
            } else if (type === 'checkbox') {
                return (
                    <>
                        {column?.source?.map(item => (
                            <Checkbox value={item.value}>{item.label}</Checkbox>)
                        )}
                    </>);
            }
            break;
        default:
            return <></>
            break;
    }
}
