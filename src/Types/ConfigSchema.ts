export interface Columns{
    field:string;
    type:string;
    label?:string;
    class?:string;
    placeholder?:string;
    list?:Boolean;
    view?:Boolean;
    validators?:any[];
    validations_msg?:any[];
    sortable?:Boolean;
    searchable?:Boolean;
    source_type?:string;
    source?:any[];
    source_from?:string;
    toggle_status?:Boolean;
    custom_felid?:any,
    relation?:Relation;
}
type Relation ={
    $lookup: {
        from: string,
        localField: string,
        foreignField: string,
        displayField: string[],
        as?:string
    }
}
export type ConfigSchema={
    columns:Columns[];
    multiple_delete?:Boolean;
    pagination:Boolean;
    per_pagecount:Number;
}