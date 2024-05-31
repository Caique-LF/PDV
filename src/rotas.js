const express = require('express');
const listarCategorias = require('./controladores/categorias');
const { cadastrarUsuario, loginUsuario, detalharPerfilUsuarioLogado, editarPerfilUsuario } = require('./controladores/usuario');
const { cadastrarProdutos, editarDadosProd, listarProduto, detalharProduto, deletarProdutoPorId } = require('./controladores/produtos');
const { cadastrarCliente } = require('./controladores/clientes');

const validarCorpoRequisicao = require('./intermediarios/validacao');

const schemaUsuario = require('./validacoes/schemaUsuario');
const schemaLogin = require('./validacoes/schemaLogin');
const schemaProdutos = require('./validacoes/schemaProdutos');
const schemaCliente = require('./validacoes/schemaCliente');

const verificarUsuarioLogado = require('./intermediarios/autenticacao');


const rotas = express();

rotas.get('/categoria', listarCategorias);

rotas.post('/usuario', validarCorpoRequisicao(schemaUsuario),cadastrarUsuario)
rotas.post('/login', validarCorpoRequisicao(schemaLogin), loginUsuario)

rotas.use(verificarUsuarioLogado)

rotas.get('/usuario', detalharPerfilUsuarioLogado)
rotas.put('/usuario', validarCorpoRequisicao(schemaUsuario), editarPerfilUsuario)

rotas.post('/produto', validarCorpoRequisicao(schemaProdutos), cadastrarProdutos);
rotas.put('/produto/:id', validarCorpoRequisicao(schemaProdutos), editarDadosProd);
rotas.get('/produto', listarProduto);
rotas.get('/produto/:id', detalharProduto);
rotas.delete('/produto/:id', deletarProdutoPorId);

rotas.post('/cliente', validarCorpoRequisicao(schemaCliente), cadastrarCliente);
module.exports = rotas;