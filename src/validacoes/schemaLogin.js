const joi = require('joi');

const schemaLogin = joi.object({
    email : joi.string().required().email().messages({
        'any.required' : 'O campo email é obrigatório',
        'string.email' : 'O campo precisa ter um formato válido',
        'string.empty' : 'O campo email é obrigatório'
    }),

    senha : joi.string().min(5).required().messages({
        'string.min' : 'A senha precisa, conter, no mínimo 5 caracteres',
        'any.requered' : 'O campo senha é obrigatório',
        'string.empty' : 'O campo senha é obrigatório'
    })
});

module.exports = schemaLogin