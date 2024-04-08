const knex = require("../conexoes/conexao");
const bcrypt = require('bcrypt');

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
        console.log(error.message)
        return res.status(500).json({menssagem : "Erro interno no servidor"})
    }
};

module.exports = {
    cadastrarUsuario
};