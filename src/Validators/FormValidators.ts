import { RuleObject } from 'antd/lib/form';
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
