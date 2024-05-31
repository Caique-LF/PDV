const JoiBase = require('joi');
const { cpf } = require('cpf-cnpj-validator');

// Estendendo o Joi com o validador de CPF
const Joi = JoiBase.extend((joi) => ({
    type: 'cpf',
    base: joi.string(),
    messages: {
        'cpf.invalid': '{{#label}} deve ser um CPF válido'
    },
    validate(value, helpers) {
        if (!cpf.isValid(value)) {
            return { value, errors: helpers.error('cpf.invalid') };
        }
    }
}));

const schemaCliente = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório',
        'string.email': 'O campo precisa ter um formato válido',
        'string.empty': 'O campo email é obrigatório'
    }),
    nome: Joi.string().required().messages({
        'string.empty': 'O campo nome é obrigatório',
        'any.required': 'O campo nome é obrigatório'
    }),
    cpf: Joi.cpf().required().messages({
        'any.required': 'O campo CPF é obrigatório',
        'string.empty': 'O campo CPF é obrigatório',
        'cpf.invalid': 'O CPF fornecido é inválido'
    }),
    cep: Joi.string().required().messages({
        'any.required': 'O campo CEP é obrigatório',
        'string.empty': 'O campo CEP é obrigatório'
    }),
    rua: Joi.string().required().messages({
        'any.required': 'O campo rua é obrigatório',
        'string.empty': 'O campo rua é obrigatório'
    }),
    numero: Joi.string().required().messages({
        'any.required': 'O campo número é obrigatório',
        'string.empty': 'O campo número é obrigatório'
    }),
    bairro: Joi.string().required().messages({
        'any.required': 'O campo bairro é obrigatório',
        'string.empty': 'O campo bairro é obrigatório'
    }),
    cidade: Joi.string().required().messages({
        'any.required': 'O campo cidade é obrigatório',
        'string.empty': 'O campo cidade é obrigatório'
    }),
    estado: Joi.string().required().messages({
        'any.required': 'O campo estado é obrigatório',
        'string.empty': 'O campo estado é obrigatório'
    })
});

module.exports = schemaCliente;
