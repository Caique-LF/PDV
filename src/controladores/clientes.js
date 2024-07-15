const knex = require('../conexoes/conexao');

const cadastrarCliente = async (req, res) => {
    const {
        nome,
        email,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado } = req.body

    try {
        const clienteExistente = await knex('clientes').where('email', email).orWhere('cpf', cpf);

        if (clienteExistente.length > 0) {
            return res.status(400).json({ mensagem: "Já existe usuário com o Email ou Cpf fornecido" })
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
            estado
        }

        const novoCliente = await knex('clientes').insert(cliente);

        if (novoCliente[0] < 1) {
            return res.status(400).json({ menssagem: "O cliente não foi cadastrado." })
        };

        return res.status(200).json({ menssagem: "Cliente cadastrado com sucesso." })
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }

};

const editarClientePorID = async (req, res) => {
    const {
        nome,
        email,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado } = req.body;

    const { id } = req.params

    try {
        const cliente = await knex('clientes').where('id', id);

        if (cliente.length === 0) {
            return res.status(404).json({ mensagem: "O cliente não foi encontrado." })
        };

        const emailOuCpfExistente = await knex('clientes').where('email', email).orWhere('cpf', cpf);

        if (emailOuCpfExistente.length > 0 && emailOuCpfExistente[0].id === id) {
            return res.status(400).json({ mensagem: "Já existe usuário com o Email ou Cpf fornecido" })
        };

        const clienteAtualizado = await knex('clientes').where('id', id).update({
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        }).returning('*');

        if (clienteAtualizado.length === 0) {
            return res.statuss(401).json({ mensagem: "O cliente não foi atualizado." })
        };

        res.status(204).json()

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" })
    }
}

const listarClientes = async (req, res) => {
    try {

        const clientes = await knex('clientes').returning('*')

        return res.status(200).json(clientes);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" })
    }
}

const detalharClientePorID = async (req, res) => {
    const { id } = req.params

    try {

        const cliente = await knex('clientes').where('id', id);

        if (cliente.length === 0) {

            return res.status(400).json({ mensagem: "Cliente não encontrado para o id informado." })
        }

        return res.status(200).json(cliente);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" })
    }
}

module.exports = {
    cadastrarCliente,
    editarClientePorID,
    listarClientes,
    detalharClientePorID
}