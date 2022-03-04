import React from 'react'
import { Columns } from '../../Types/ConfigSchema'
import { Form, Input } from 'antd';
import { RuleObject } from 'antd/lib/form';
import { patternValidator, scriptValidator } from '../../Validators/FormValidators';
import Feild from './Feild';
export interface feildbuilderprops {
    type?: String;
    config?: Columns
}

function FeildBuilder(prop: feildbuilderprops) {
    const { config } = prop;
        return (
            <>
            <Form.Item
                label={config?.label}
                name={config?.field}
                rules={getRule(config)}
            >
                {Feild({type:config?.type,placeholder:config?.placeholder,rest:config})}
            </Form.Item>
            </>
        )

}

function getRule(config?: Columns): any[] {
    
    let validations: any[] = [];
    if (config?.validators&&config?.validations_msg) {
        const validation = config.validators[0];
        const valdation_message =config.validations_msg[0]
            if (validation.required) {
                validations.push({
                    required: true,
                    message:valdation_message.required
                })
            } 
            if (validation.pattern) {
                validations.push(
                    {
                        validator: (rule: RuleObject, value: any): Promise<any> => {
                            return patternValidator(rule, value, validation.pattern, valdation_message.pattern);
                        }
                    }
                )
            }
            if (validation.script) {
                validations.push(
                    {
                        validator: (rule: RuleObject, value: any): Promise<any> => {
                            return scriptValidator(rule, value);
                        }
                    }
                )
            }
    }
    return validations;
}
export default FeildBuilder
