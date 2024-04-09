const express = require('express');
const listarCategorias = require('./controladores/categorias');
const { cadastrarUsuario, loginUsuario } = require('./controladores/usuario');

const validarCorpoRequisicao = require('./intermediarios/validacao');

const schemaUsuario = require('./validacoes/schemaUsuario');
const schemaLogin = require('./validacoes/schemaLogin');

const rotas = express();

rotas.get('/categoria', listarCategorias);

rotas.post('/usuario', validarCorpoRequisicao(schemaUsuario),cadastrarUsuario)
rotas.post('/login', validarCorpoRequisicao(schemaLogin), loginUsuario)
module.exports = rotas;