import React, {useEffect, useState} from 'react'
import {
    AutoComplete,
    Checkbox,
    DatePicker,
    Input,
    InputNumber,
    Radio,
    Select,
    Slider,
    Space,
    Switch,
    TimePicker
} from 'antd';
import {Columns} from '../../Types/ConfigSchema';
import TextArea from 'antd/lib/input/TextArea';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-dracula";
import 'ace-builds/src-noconflict/snippets/json'
import {SubmitedFeildValue} from '../../Types/HelperTypes'
import {CheckOutlined, CloseOutlined} from '@ant-design/icons';
import Uploader from './Molecules/Uploader';
import {BaseApi} from "../../api/BaseApi";

export interface feildprops {
    type?: String;
    rest?: Columns
    placeholder?: string
    submitedValue?: SubmitedFeildValue;
};
type Item = {
    value: String;
    label: any;
};

function Feild(props: feildprops) {

    const {type, placeholder, submitedValue, rest} = props;
    const value = submitedValue?.value;
    const api = BaseApi.getInsance();
    const {Option} = Select;
    type optiondata = {
        label: string,
        value: any
    }
    const [state, setState] = useState<{ data: any[] }>({data: []});
    useEffect(() => {
        switch (rest?.source_type) {
            case 'static':
                setState(prevState =>(
                {...prevState, data: rest.source || []}));
                break;
            case 'dynamic':
                api.getOptions(rest?.source_from)
                    .then(({data: resp}) => {
                        const {success, data} = resp;
                        if (success) {
                            setState(prevState =>({...prevState, data: data}));
                        } else {
                        }
                    }).catch((_: any) => {
                })
        }
    }, []);
    switch (type) {
        case 'text':
            return (
                <Input placeholder={placeholder}/>
            )
            break;
        case 'select':
            return (<Select
                placeholder={placeholder}
                onChange={undefined}
                allowClear
            >
                {state.data.map(item => (
                    <Option value={item.value}>{item.label}</Option>)
                )}
            </Select>);
            break;
        case 'multiselect':
            return <Select
                mode="multiple"
                placeholder={placeholder}
                onChange={undefined}
                allowClear
            >
                {state.data.map(item => (
                    <Option value={item.value}>{item.label}</Option>)
                )}
            </Select>;
        {/*{...props.rest?.additional}*/
        }
            break
        case 'radio':
            return (<Radio.Group
                onChange={undefined}
            >
                <Space direction="vertical">
                    {state.data.map(item => (
                        <Radio value={item.value}>{item.label}</Radio>)
                    )}
                </Space>
            </Radio.Group>);
            break;
        case 'autocomplete':
            return (<AutoComplete
                dropdownMatchSelectWidth={252}
                // options={getOptionAuto(props.rest, 'auto')}
                onSelect={undefined}
                onSearch={undefined}
            >
                <Input size="large" placeholder={placeholder}/>
            </AutoComplete>);
            break;
        case 'checkbox':
            return (
                <Checkbox.Group onChange={undefined}>
                    <Space direction="vertical">
                        {state.data.map(item => (
                            <Checkbox value={item.value}>{item.label}</Checkbox>)
                        )}
                    </Space>
                </Checkbox.Group>);
            break;
        case 'date':
            return (
                <DatePicker onChange={undefined}/>
            );
        case 'password':
            return (<Input.Password placeholder={placeholder}/>);
            break;
        case 'textarea':
            return (<TextArea showCount maxLength={undefined} onChange={undefined}/>);
            break;
        case 'numberinput':
            return (<InputNumber onChange={undefined}/>);
            break;
        case 'slider':
            return (<Slider/>);
            break;
        case 'switch':
            return (<Switch
                checkedChildren={<CheckOutlined/>}
                unCheckedChildren={<CloseOutlined/>}
            />);
            break;
        case 'time':
            return (<TimePicker onChange={undefined}/>);
            break;
        case 'upload':
            return (
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