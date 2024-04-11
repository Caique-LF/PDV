const knex = require("../conexoes/conexao");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaJwt = process.env.JWT_HASH

const cadastrarUsuario = async (req, res)=>{
    const {nome, email, senha} = req.body

    try {

        const verificarEmailExistente = await knex('usuarios').where('email', email);
        
        if(verificarEmailExistente.length > 0){
            return res.status(400).json({menssagem : 
                `Desculpe, mas o e-mail que você está tentando cadastrar já está em uso. Por favor, tente com um e-mail diferente.`})
        };

        const senhaCriptografada = await bcrypt.hash(senha, 10)
        const usuario = {
            nome,
            email,
            senha : senhaCriptografada
        };

        const novoUsuario = await knex('usuarios').insert(usuario).returning('*');

        if(novoUsuario.length<1){
            return res.status(400).json({menssagem : "O usuário não foi cadastrado."})
        };

        return res.status(200).json({menssagem : "Usuário cadastrado com sucesso."})
    } catch (error) {
        return res.status(500).json({menssagem : "Erro interno no servidor"})
    }
};

const loginUsuario = async (req, res)=>{
    const {email, senha} = req.body

    try {
        const usuario = await knex('usuarios').where('email',email);
        console.log(usuario);
        if (usuario.rowCount < 1) {
            return res.status(401).json({menssagem : "Email ou senha inválidos. Por favor, tente novamente."})
        };

        const senhaValida = await bcrypt.compare(senha, usuario[0].senha)
        
        if(!senhaValida){
            return res.status(401).json({menssagem : "Email ou senha inválidos. Por favor, tente novamente."})
        };

        const token = jwt.sign({id: usuario[0].id}, senhaJwt, {expiresIn: '8h'});
        const {id, nome} = usuario[0]

        return res.status(200).json({usuario : id, nome, token})

    } catch (error) {
        return res.status(500).json(error.message)
    }
};

const detalharPerfilUsuarioLogado = async (req, res) =>{

    const {senha:_ , ...usuario} = req.usuario[0]

    return res.status(200).json(usuario)

};

module.exports = {
    cadastrarUsuario,
    loginUsuario,
    detalharPerfilUsuarioLogado
};