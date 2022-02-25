import Joi from 'joi';
interface validation{
    required:boolean,
    pattern:string
}
export const JobSchema = Joi.object({
    field: Joi.string().required(),
    type: Joi.string().required(),
    label: Joi.string().optional(),
    class: Joi.string().optional(),
    placeholder: Joi.string().optional(),
    list: Joi.boolean().optional(),
    view: Joi.boolean().optional(),
    export: Joi.boolean().optional(),
    searchable: Joi.boolean().optional(),
    toggle_status: Joi.boolean().optional(),
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
        pattern: Joi.string().optional()
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
                        })
                }))
            }
        ],
        otherwise: Joi.optional()
    }
    )
});
