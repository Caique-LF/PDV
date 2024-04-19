const knex = require("../conexoes/conexao");


const cadastrarProdutos = async (req, res) =>{
    const {descricao, quantidade_estoque, valor, categoria_id} = req.body

    try {
        const verificarCategoria = await knex('categorias').where('id', categoria_id)

        if(!verificarCategoria[0]){
            return res.status(400).json({mensagem : "categoria não encontrada"})
        };

        const produtoCadastrado = await knex('produtos').insert({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        }).returning('*')

        return res.status(201).json()
    } catch (error) {
        return res.status(500).json({mensagem :"Erro interno no servido" })
    }
};

module.exports = {
    cadastrarProdutos
}