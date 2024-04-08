const knex = require("../conexoes/conexao")

const listarCategorias = async (req, res) =>{
    
    try {
        const categorias = await knex('categorias');
        
        return res.status(200).json(categorias)
        
    } catch (error) {
        return res.status(500).json({menssagem: "Erro interno no servidor"})
        
    }
};

module.exports = listarCategorias