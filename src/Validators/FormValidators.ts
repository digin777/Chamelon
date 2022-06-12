import { RuleObject } from 'antd/lib/form';
import{JobSchema} from '../Validators/ConfigValidatorJoI';
type Ruler = (rule: RuleObject, value: any, cb: (msg?: string) => void) => Promise<any>;
export const patternValidator = (rule: RuleObject, value: any, Patern: string | RegExp, Message?: String): Promise<any> => {
    // return (rule: RuleObject, value: any, cb: (msg?: string) => void): Promise<any> => {
        return new Promise((resolve, reject) => {
            const newPatern: RegExp = new RegExp(Patern);
            if (newPatern.test(value))
                resolve("ok");
            else
                reject(Message);
        })
    // };
}

export const scriptValidator =(rule:RuleObject,value:any): Promise<any> => {
    return new Promise((resolve, reject) => {
        value =JSON.parse(value);
        const validate=JobSchema.validate(value.column);
        if (!validate.error){
            resolve("ok");
        }else{
            console.log(validate.error)
            reject(validate.error.message);
        }
    })
}
