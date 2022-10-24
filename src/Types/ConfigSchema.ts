export interface Columns{
    field:string;
    type:string;
    label?:string;
    class?:string;
    placeholder?:string;
    list?:boolean;
    view?:boolean;
    dbtype?:string;
    validators?:any[];
    validations_msg?:any[];
    sortable?:boolean;
    searchable?:boolean;
    source_type?:string;
    source?:any[];
    source_from?:string;
    toggle_status?:boolean;
    custom_felid?:any;
    relation?:Relation;
    additional?:Additonal;
}
type Additonal=TextAdditional|NumberAdditional|RadioAdditional|RateAdditional|SelectAdditional|SliderAdditional|SwitchAdditional|TimeAdditional|UploadAdditional|DateAdditonal|CheckBoxAdditonal|MultiselectAdditional;
type Relation ={
        from: string,
        foreignField: string,
        displayField: string,
}
interface TextAdditional{
    defaultValue?:string,
    disabled?:boolean,
    maxLength?:number,
    value?:string
}
interface NumberAdditional{
    controls?:boolean;
    decimalSeparator?:string;
    defaultValue?:number;
    disabld?:boolean;
    max?:number;
    min?:number;
    readonly?:boolean;
    step?:number
}

interface RadioAdditional{
    disabled?:boolean;
    optionType?:'default' | 'button';
    buttonStyle?:'outline' | 'solid';
}

interface RateAdditional{
    allowClear?:boolean;
    allowHalf?:boolean;
    count?:number;
    defaultValue?:number;
    disabled?:boolean;
    tooltips?:string[]
}

interface SelectAdditional{
    autoClearSearchValue?:boolean;
    allowClear?:boolean;
    showSearch?:boolean;
    showArrow?:boolean;
}
interface MultiselectAdditional extends SelectAdditional{
    maxTagTextLength?:number;
    maxTagCount?:number | 'responsive';
    disabled?:boolean;
}
interface SliderAdditional{
    disabled?:boolean;
    max?:number;
    min?:number;
    range?:boolean;
    reverse?:boolean;
    step?:number | null;
    tooltipVisible?:boolean;
    vertical?:boolean;
}
interface SwitchAdditional{
    checked?:boolean;
    disabled?:boolean;
}

interface TimeAdditional{
    use12Hours?:boolean;
    showNow?:boolean;
    secondStep?:number;
    minuteStep?:number;
    hourStep?:number;
    format?:string;
    allowClear?:boolean;
}
interface UploadAdditional{
    accept?:string;
    disabled?:boolean;
    listType?:'text'| 'picture'|  'picture-card';
    maxCount?:number;
    multiple?:boolean;

}
interface DateAdditonal{
    showNow:boolean;
    showToday:boolean;
}
interface CheckBoxAdditonal{
    defaultValue:string[];
}
export type ConfigSchema={
    columns:Columns[];
    multiple_delete?:boolean;
    pagination:boolean;
    per_pagecount:number;
}