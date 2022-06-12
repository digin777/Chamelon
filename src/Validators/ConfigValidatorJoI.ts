import Joi from 'joi';
interface validation {
    required: boolean,
    pattern: string
}
export const JobSchema = Joi.array().items(Joi.object({
    field: Joi.string().required(),
    type: Joi.string().required(),
    label: Joi.string().optional(),
    class: Joi.string().optional(),
    dbtype:Joi.optional().when(
        'type', {
            switch: [
                {
                    is: 'checkbox',
                    then: Joi.string().valid("Array").required()
                },
                {
                    is: 'multiselect',
                    then: Joi.string().valid("Array").required()
                },
                {
                    is: 'date',
                    then: Joi.string().valid("Date").required()
                },
                {
                    is: 'time',
                    then: Joi.string().valid("Date").required()
                },
                {
                    is: 'numberinput',
                    then: Joi.string().valid("Number").required()
                }
            ],
            otherwise: Joi.string().optional()
        }),
    placeholder: Joi.string().optional(),
    list: Joi.boolean().optional(),
    view: Joi.boolean().optional(),
    export: Joi.boolean().optional(),
    searchable: Joi.boolean().optional(),
    toggle_status: Joi.boolean().optional(),
    custom_felid: Joi.any().optional(),
    relation: Joi.object().optional(),
    sortable: Joi.boolean().optional(),
    source_type: Joi.string().optional().when(
        'type', {
        is: 'select',
        then: Joi.string().required()
    })
        .when(
            'type', {
            is: 'multiselect',
            then: Joi.string().required()
        }
        ),
    source: Joi.array().optional().when(
        'source_type', {
        is: 'static',
        then: Joi.array().items(Joi.object({
            label: Joi.string().required().messages({ 'any.required': `label is required` }),
            value: Joi.string().required().messages({ 'any.required': `value is required` }),
        })).required()
    }
    ),
    source_from: Joi.string().optional().when(
        'source_type', {
        is: 'dynamic',
        then: Joi.string().required().messages({
            'any.required': `sorcrce from is required`
        })
    }).when(
        'source_type', {
        is: 'static',
        then: Joi.string().forbidden().messages({
            'string.forbidden': `only dynamic source_type support source_from`
        })
    }),
    validators: Joi.array().items(Joi.object({
        required: Joi.boolean().optional(),
        pattern: Joi.string().optional(),
        script: Joi.boolean().optional()
    })).optional(),
    validations_msg: Joi.array().when(
        'validators', {
        switch: [
            {
                is: Joi.exist(),
                then: Joi.array().items(Joi.object({
                    required: Joi.string()
                        .when(Joi.ref('....validators.0.required'),
                            {
                                is: Joi.exist(),
                                then: Joi.required(),
                                otherwise: Joi.forbidden().label('required.message')
                            }),
                    pattern: Joi.string()
                        .when(Joi.ref('....validators.0.pattern'), {
                            is: Joi.exist(),
                            then: Joi.required(),
                            otherwise: Joi.forbidden().label('pattern.message')
                        }),
                    script: Joi.string()
                        .when(Joi.ref('....validators.0.script'),
                            {
                                is: Joi.exist(),
                                then: Joi.required(),
                                otherwise: Joi.forbidden().label('required.message')
                            }),
                }))
            }
        ],
        otherwise: Joi.optional()
    }
    ),
    additional: Joi.object().when(
        'type', {
        switch: [
            {
                is: 'text',
                then: Joi.object({
                    defaultValue: Joi.string().optional(),
                    disabled: Joi.boolean().optional(),
                    maxLength: Joi.number().optional(),
                    value: Joi.string().optional()
                }).optional(),
            },
            {
                is: 'number',
                then: Joi.object({
                    controls: Joi.boolean().optional(),
                    decimalSeparator: Joi.string().optional(),
                    defaultValue: Joi.number().optional(),
                    disabld: Joi.boolean().optional(),
                    max: Joi.number().optional(),
                    min: Joi.number().optional(),
                    readonly: Joi.boolean().optional(),
                    step: Joi.number().optional()
                }).optional()
            },
            {
                is: 'radio',
                then: Joi.object({
                    disabled: Joi.boolean().optional(),
                    optionType: Joi.string().allow('default', 'button').optional(),
                    buttonStyle: Joi.string().allow('outline', 'solid').optional()
                }).optional()
            },
            {
                is: 'rate',
                then: Joi.object({
                    allowClear: Joi.boolean().optional(),
                    allowHalf: Joi.boolean().optional(),
                    count: Joi.number().optional(),
                    defaultValue: Joi.number().optional(),
                    disabled: Joi.boolean().optional(),
                    tooltips: Joi.array().items(Joi.string()).optional(),
                }).optional()
            },
            {
                is: 'select',
                then: Joi.object({
                    autoClearSearchValue: Joi.boolean().optional(),
                    allowClear: Joi.boolean().optional(),
                    showSearch: Joi.boolean().optional(),
                    showArrow: Joi.boolean().optional(),
                }).optional()
            },
            {
                is: 'multiselect',
                then: Joi.object({
                    disabled: Joi.boolean().optional(),
                    autoClearSearchValue: Joi.boolean().optional(),
                    allowClear: Joi.boolean().optional(),
                    showSearch: Joi.boolean().optional(),
                    showArrow: Joi.boolean().optional(),
                    maxTagTextLength: Joi.number().optional(),
                    maxTagCount: Joi.alternatives(Joi.string(), Joi.number()).allow('responsive')
                }).optional()
            },
            {
                is: 'slider',
                then: Joi.object({
                    disabled: Joi.boolean().optional(),
                    max: Joi.number().optional(),
                    min: Joi.number().optional(),
                    range: Joi.boolean().optional(),
                    reverse: Joi.boolean().optional(),
                    step: Joi.number().allow(null).optional(),
                    tooltipVisible: Joi.boolean().optional(),
                    vertical: Joi.boolean().optional(),
                }).optional()
            },
            {
                is: 'switch',
                then: Joi.object({
                    checked: Joi.boolean().optional(),
                    disabled: Joi.boolean().optional()
                }).optional()
            },
            {
                is: 'time',
                then: Joi.object({
                    use12Hours: Joi.boolean().optional(),
                    showNow: Joi.boolean().optional(),
                    secondStep: Joi.number().optional(),
                    minuteStep: Joi.number().optional(),
                    hourStep: Joi.number().optional(),
                    format: Joi.string().optional(),
                    allowClear: Joi.boolean().optional()
                }).optional()
            },
            {
                is: 'upload',
                then: Joi.object({
                    accept: Joi.string().optional(),
                    disabled: Joi.boolean().optional(),
                    listType: Joi.string().allow('text', 'picture', 'picture-card').optional(),
                    maxCount: Joi.number().optional(),
                    multiple: Joi.boolean().optional(),
                    action:Joi.string().uri().optional(),
                }).optional()
            },
            {
                is: 'date',
                then: Joi.object({
                    showNow: Joi.boolean().optional(),
                    showToday: Joi.boolean().optional()
                }).optional()
            },
            {
                is: 'checkbox',
                then: Joi.object({
                    defaultValue: Joi.array().items(Joi.string()).optional()
                }).optional()
            },
        ]
    }
    )
}));
