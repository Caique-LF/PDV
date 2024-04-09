const knex = require('knex');
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

        const usuario = knex('usuarios').where('id', id);
        

    } catch (error) {
        return res.status(500).json({menssagem : "Erro interno no servidor"})
    }
};

module.exports = verificarUsuarioLogado