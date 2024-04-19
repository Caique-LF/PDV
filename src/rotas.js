const express = require('express');
const listarCategorias = require('./controladores/categorias');
const { cadastrarUsuario, loginUsuario, detalharPerfilUsuarioLogado, editarPerfilUsuario } = require('./controladores/usuario');

const validarCorpoRequisicao = require('./intermediarios/validacao');

const schemaUsuario = require('./validacoes/schemaUsuario');
const schemaLogin = require('./validacoes/schemaLogin');
const verificarUsuarioLogado = require('./intermediarios/autenticacao');
const { cadastrarProdutos } = require('./controladores/produtos');
const schemaProdutos = require('./validacoes/schemaProdutos');

const rotas = express();

rotas.get('/categoria', listarCategorias);

rotas.post('/usuario', validarCorpoRequisicao(schemaUsuario),cadastrarUsuario)
rotas.post('/login', validarCorpoRequisicao(schemaLogin), loginUsuario)

rotas.use(verificarUsuarioLogado)

rotas.get('/usuario', detalharPerfilUsuarioLogado)
rotas.put('/usuario', validarCorpoRequisicao(schemaUsuario), editarPerfilUsuario)

rotas.post('/produto', validarCorpoRequisicao(schemaProdutos), cadastrarProdutos);

module.exports = rotas;