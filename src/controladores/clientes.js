const knex = require('../conexoes/conexao');

const cadastrarCliente = async (req, res) =>{
    const {
        nome,
         email, 
         cpf, 
         cep, 
         rua, 
         numero, 
         bairro,
         cidade, 
         estado} = req.body

         try {
            const clienteExistente = await knex('clientes').where('email', email).orWhere('cpf', cpf);

            if(clienteExistente.length > 0){
                return res.status(400).json({mensagem: "Já existe usuário com o Email ou Cpf fornecido"})
            };

            const cliente = {
                nome,
                email, 
                cpf, 
                cep, 
                rua, 
                numero, 
                bairro,
                cidade, 
                estado}

            const novoCliente = await knex('clientes').insert(cliente);

            if(novoCliente[0] < 1){
                return res.status(400).json({menssagem : "O cliente não foi cadastrado."})
            };
    
            return res.status(200).json({menssagem : "Cliente cadastrado com sucesso."})
         } catch (error) {
            return res.status(500).json({mensagem : "Erro interno no servidor"});
         }

}

module.exports = {
    cadastrarCliente
}