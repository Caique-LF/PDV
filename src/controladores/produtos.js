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

const editarDadosProd = async (req, res) =>{
    const {descricao, quantidade_estoque, valor, categoria_id} = req.body
    const id = req.params.id

    try {
        const produto = await knex('produtos').where('id', id)

        if(produto.length === 0){
            return res.status(404).json({mensagem : "O id informado não corresponde a nenhum produto."})
        };

        const produtoEditado = await knex('produtos').where('id', id).update({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id 
        });
        
        if(!produtoEditado){
            return res.status(400).json({mensagem : "Usuario não atulalizado"})
        };

        return res.status(201).json({mensagem : "Produto editado com sucesso"})
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({mensagem :"Erro interno no servido" })
    }
}

module.exports = {
    cadastrarProdutos,
    editarDadosProd
}