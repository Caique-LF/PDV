const joi = require("joi");

const schemaCliente = joi.object({

    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório',
        'string.email': 'O campo precisa ter um formato válido',
        'string.empty': 'O campo email é obrigatório'
    }),
    nome : joi.string().required().messages({
        'string.empty' : 'o campo nome é obrigatório',
        'any.required' : 'O campo nome é obrigatório'
    }),
    cpf: joi.string().required().messages({
        'any.required': 'O campo CPF é obrigatório',
        'string.empty': 'O campo CPF é obrigatório'
    }),
    cep: joi.string().required().messages({
        'any.required': 'O campo CEP é obrigatório',
        'string.empty': 'O campo CEP é obrigatório'
    }),
    rua: joi.string().required().messages({
        'any.required': 'O campo rua é obrigatório',
        'string.empty': 'O campo rua é obrigatório'
    }),
    numero: joi.string().required().messages({
        'any.required': 'O campo número é obrigatório',
        'string.empty': 'O campo número é obrigatório'
    }),
    bairro: joi.string().required().messages({
        'any.required': 'O campo bairro é obrigatório',
        'string.empty': 'O campo bairro é obrigatório'
    }),
    cidade: joi.string().required().messages({
        'any.required': 'O campo cidade é obrigatório',
        'string.empty': 'O campo cidade é obrigatório'
    }),
    estado: joi.string().required().messages({
        'any.required': 'O campo estado é obrigatório',
        'string.empty': 'O campo estado é obrigatório'
    }),
    
});

module.exports = schemaCliente;