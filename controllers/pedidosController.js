const Pedido = require("../modelos/pedido");

module.exports = {
    index: async (req, res, next) => {
        const pedidos = await Pedido.lista()
        res.status(200).send( pedidos )
    },
    create: (req, res, next) => {
        const pedido = new Pedido(req.body)
        pedido.id = new Date().getTime()
        Pedido.salvar(pedido)
        res.status(201).send(pedido)
    },
    delete: (req, res, next) => {
        Pedido.apagarPorId(req.params.id)
        res.status(204).send("")
    },
    update: async (req, res, next) => {
        let pedidoDb = await Pedido.buscaPorId(req.params.id)
        if(!pedidoDb) return res.status(404).send({mensagem: "Pedido não encontrado"})

        const pedido = new Pedido(req.body)
        pedido.id = pedidoDb.id
        Pedido.salvar(pedido)
        res.status(200).send(pedido)
    },
    show: async (req, res, next) => {
        let pedidoDb = await Pedido.buscaPorId(req.params.id)
        if(!pedidoDb) return res.status(404).send({mensagem: "Pedido não encontrado"})
        res.status(200).send(pedidoDb)
    }
};
