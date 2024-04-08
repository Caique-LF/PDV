const express = require('express');
const listarCategorias = require('./controladores/categorias');
const { cadastrarUsuario } = require('./controladores/usuario');

const validarCorpoRequisicao = require('./intermediarios/validacao');

const schemaUsuario = require('./validacoes/schemaUsuario');

const rotas = express();

rotas.get('/categoria', listarCategorias);

rotas.post('/usuario', validarCorpoRequisicao(schemaUsuario),cadastrarUsuario)

module.exports = rotas;