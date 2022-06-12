import Ajv, { JSONSchemaType } from "ajv"
const ajv = new Ajv()
// import { ConfigSchema } from '../Types/ConfigSchema'

const innerSchema = {
    type: "object",
    properties: {
        required: {
            type: "boolean"
        },
        "pattern": {
            type: "string"
        }
    },
}


export const dataOut = {
    column: [
        {
            field: "title",
            type: "text",
            label: "Title",
            class: "text",
            sortable: true,
            searchable: true,
            list: true,
            view: true,
            placeholder: "Title",
            export: true,
            validators: [
                {
                    required: true,
                    pattern: "^(?=.*[\\w\\d]).+"
                }
            ],
            validations_msg: [
                {
                    required: "Title is required",
                    pattern: "Provide valid Title"
                }
            ]
        },
        {
            field: "order",
            type: "text",
            label: "Order",
            class: "text",
            sortable: true,
            searchable: true,
            list: true,
            view: true,
            placeholder: "Order",
            export: true,
            validators: [
                {
                    required: true,
                    pattern: "^([0-9]*[1-9][0-9]*(.[0-9]+)?|[0]+.[0-9]*[1-9][0-9]*)$"
                }
            ],
            validations_msg: [
                {
                    required: "Order is required",
                    pattern: "It must be a valid number&higher than 0"
                }
            ]
        },
        {
            field: "status",
            type: "radio",
            label: "Status",
            class: "text",
            sortable: true,
            searchable: true,
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
            list: true,
            view: true,
            placeholder: "Status",
            export: true,
            validators: [
                {
                    required: true
                }
            ],
            validations_msg: [
                {
                    required: "Status required"
                }
            ]
        },
        {
            field: "state",
            type: "select",
            label: "Status",
            class: "text",
            sortable: true,
            searchable: true,
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
            list: true,
            view: true,
            placeholder: "Status",
            export: true,
            validators: [
                {
                    required: true
                }
            ],
            validations_msg: [
                {
                    required: "Status required"
                }
            ]
        },
        {
            field: "dater",
            type: "date",
            label: "date",
            class: "text",
            sortable: true,
            searchable: true,
            list: true,
            view: true,
            placeholder: "Order",
            export: true,
            validators: [
                {
                    required: true,

                }
            ],

            validations_msg: [
                {
                    required: "Order is required",

                }
            ]
        },
        {
            field: "datereeWEWEWEE",
            type: "time",
            label: "date",
            class: "text",
            sortable: true,
            searchable: true,
            list: true,
            view: true,
            placeholder: "Order",
            export: true,
            validators: [
                {
                    required: true,

                }
            ],
            validations_msg: [
                {
                    required: "Order is required",

                }
            ]
        },
        {
            field: "daterr",
            type: "slider",
            label: "date",
            class: "text",
            sortable: true,
            searchable: true,
            list: true,
            view: true,
            placeholder: "Order",
            export: true,
            validators: [
                {
                    required: true,

                }
            ],
            validations_msg: [
                {
                    required: "Order is required",

                }
            ]
        },
        {
            field: "deater",
            type: "switch",
            label: "date",
            class: "text",
            sortable: true,
            searchable: true,
            list: true,
            view: true,
            placeholder: "Order",
            export: true,
            validators: [
                {
                    required: true,

                }
            ],
            validations_msg: [
                {
                    required: "Order is required",

                }
            ]
        },
        {
            field: "datzer",
            type: "numberinput",
            label: "date",
            class: "text",
            sortable: true,
            searchable: true,
            list: true,
            view: true,
            placeholder: "Order",
            export: true,
            validators: [
                {
                    required: true,

                }
            ],
            validations_msg: [
                {
                    required: "Order is required",

                }
            ]
        },
        {
            field: "dastzer",
            type: "textarea",
            label: "date",
            class: "text",
            sortable: true,
            searchable: true,
            list: true,
            view: true,
            placeholder: "Order",
            export: true,
            validators: [
                {
                    required: true,

                }
            ],
            validations_msg: [
                {
                    required: "Order is required",

                }
            ]
        },
        {
            field: "ddastzer",
            type: "password",
            label: "date",
            class: "text",
            sortable: true,
            searchable: true,
            list: true,
            view: true,
            placeholder: "Order",
            export: true,
            validators: [
                {
                    required: true,

                }
            ],
            validations_msg: [
                {
                    required: "Order is required",

                }
            ]
        },
        {
            field: "dasstzer",
            type: "autocomplete",
            label: "date",
            class: "text",
            sortable: true,
            searchable: true,
            list: true,
            view: true,
            placeholder: "Order",
            export: true,
            source_type: 'static',
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

                }
            ],
            validations_msg: [
                {
                    required: "Order is required",

                }
            ]
        },
        {
            field: "dasffstzer",
            type: "checkbox",
            label: "date",
            class: "text",
            sortable: true,
            searchable: true,
            list: true,
            view: true,
            placeholder: "Order",
            export: true,
            source_type: 'static',
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

                }
            ],
            validations_msg: [
                {
                    required: "Order is required",

                }
            ]
        },


    ],
    pagination: true,
    per_pagecount: "10",
    import_unique_field: "title"
}

export const datasub = [
    {
        type:"text",
        field: "title",
        value: "sss"
    },
    {
        type:"text",
        field: "order",
        value: "110",
    },
    {
        type:"radio",
        field: "status",
        value: "inactive",
    },
    {
        type:"select",
        field: "state",
        value: "active",
    },
    {
        type:"date",
        field: "dater",
        value: "2022-03-08T14:17:40.943Z",
    },
    {
        type:"time",
        field: "datereeWEWEWEE",
        value: "2022-03-04T04:34:04.257Z",
    },
    {
        type:"slider",
        field: "daterr",
        value: 12,
    },
    {
        type:"switch",
        field: "deater",
        value: true,
    },
    {
        type:"numberinput",
        field: "datzer",
        value: 10,
    },
    {
        type:"textarea",
        field: "dastzer",
        value: "jhgjgjg",
    },
    {
        type:"password",
        field: "ddastzer",
        value: "10121",
    },
    {
        type:"autocomplete",
        field: "dasstzer",
        value: "active",
    },
    {
        type:"checkbox",
        field: "dasffstzer",
        value: [
            "active"
        ]
    }
]

export const sectionconfig ={
    column: [
        {
            field: "section_name",
            type: "text",
            label: "Section Name",
            class: "",
            placeholder: "Enter your section name",
            sortable: true,
            searchable: true,
            list: true,
            view: true,
            validators: [
                {
                    required: true
                }
            ],
            validations_msg: [
                {
                    required: "section name is required"
                }
            ]
        },
        {
            field: "section_alias",
            type: "text",
            label: "Section Alias",
            class: "",
            placeholder: "Enter your section alias",
            sortable: true,
            searchable: false,
            list: true,
            view: true,
            validators: [
                {
                    required: true
                }
            ],
            validations_msg: [
                {
                    required: "section alias is required"
                }
            ]
        },
        {
            field: "section_table_name",
            type: "text",
            label: "Table Name",
            placeholder: "Enter your table name",
            class: "",
            sortable: true,
            searchable: false,
            list: true,
            view: true,
            validators: [
                {
                    required: true
                }
            ],
            validations_msg: [
                {
                    required: "table name is required"
                }
            ]
        },
        {
            field: "section_config",
            type: "script",
            label: "Section Config",
            placeholder: "Enter your section config",
            class: "",
            sortable: true,
            searchable: false,
            list: false,
            view: true,
            validators: [
                {
                    required: true,
                    script:true
                }
            ],
            validations_msg: [
                {
                    required: "section config is required",
                    script:"Invalid config"
                    
                }
            ]
        }
    ],
    pagination: true,
    per_pagecount: "5"
};