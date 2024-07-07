const joi = require('joi');

const schemaProdutos = joi.object({
    descricao : joi.string().required().messages({
        'any.required': 'O campo descrição é obrigatório',
        'string.empty': 'O campo descrição é obrigatório'
    }),

    quantidade_estoque : joi.number().min(0).required().messages({
        'number.base' : 'O campo quantidade_estoque deve ser um número inteiro',
        'number.min' : 'O campo quantidade_estoque deve ser maior ou igual a 0',
        'any.requride' : 'O campo quantidade_estoque é obrigatório'
    }),

    valor : joi.number().min(1).required().messages({
        'number.base' : 'o campo valor deve ser um número inteiro',
        'number.min': 'O Campo valor dever ser maior ou igual a 0',
        'any.required' : 'O campo valor é obrigatório'
    }),

    categoria_id : joi.number().min(1).required().messages({
        'number.base' : 'O campo categoria_id deve ser um número inteiro',
        'number.min' : 'O campo categoria_id dever serum número positivo',
        'any.required' : 'o campo categoria_id é obrigatório'
    })
});

module.exports = schemaProdutos