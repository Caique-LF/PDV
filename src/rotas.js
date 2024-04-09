const express = require('express');
const listarCategorias = require('./controladores/categorias');
const { cadastrarUsuario, loginUsuario, detalharPerfilUsuarioLogado } = require('./controladores/usuario');

const validarCorpoRequisicao = require('./intermediarios/validacao');

const schemaUsuario = require('./validacoes/schemaUsuario');
const schemaLogin = require('./validacoes/schemaLogin');
const verificarUsuarioLogado = require('./intermediarios/autenticacao');

const rotas = express();

rotas.get('/categoria', listarCategorias);

rotas.post('/usuario', validarCorpoRequisicao(schemaUsuario),cadastrarUsuario)
rotas.post('/login', validarCorpoRequisicao(schemaLogin), loginUsuario)

rotas.use(verificarUsuarioLogado)

rotas.get('/usuario', detalharPerfilUsuarioLogado)
module.exports = rotas;