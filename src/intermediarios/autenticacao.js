const knex = require("../conexoes/conexao");
const jwt = require('jsonwebtoken');
const senhaJwt = process.env.JWT_HASH;


const verificarUsuarioLogado = async (req, res, next) =>{
    const {authorization} = req.headers

    if (!authorization) {
        return res.status(401).json({mensagem : "Não autorizado"})
    };
    const token = authorization.split(' ')[1]

    try {
        
        const {id} = jwt.verify(token, senhaJwt);

        const usuario = await knex("usuarios").where("id", id)
        
        if(!usuario){
            return res.status(401).json({mensagem : "Não autorizado"})
        };

        req.usuario = usuario

        next()
    } catch (error) {
        if(error instanceof jwt.JsonWebTokenError){
            return res.status(401).json({mensagem : "Token inválido"})
        }
        return res.status(500).json({menssagem : "Erro interno no servidor"})
    }
};

module.exports = verificarUsuarioLogado