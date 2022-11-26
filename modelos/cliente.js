module.exports = class Cliente {
    constructor(cliente){
        this.id = cliente?.id
        this.nome = cliente?.nome
        this.cpf = cliente?.cpf
        this.telefone = cliente?.telefone
        this.endereco = cliente?.endereco
        this.valor = cliente?.valor
    }


    // metodos staticos
    static async apagarPorId(id){
        const listaClientes = await this.lista()
        const listaNova = []
        for(let i=0; i<listaClientes.length; i++){
            const clienteDb = listaClientes[i]
            if(clienteDb.id.toString() !== id.toString()){
                listaNova.push(clienteDb)
            }
        }

        Cliente.salvarJsonDisco(listaNova)
    }
    
    static async buscaPorId(id){
        const listaClientes = await this.lista()
        for(let i=0; i<listaClientes.length; i++){
            const clienteDb = listaClientes[i]
            if(clienteDb.id.toString() === id.toString()){
                return clienteDb
            }
        }

        return null
    }

    static async salvar(cliente){
        const listaClientes = await this.lista()
        let exist = false
        for(let i=0; i<listaClientes.length; i++){
            const clienteDb = listaClientes[i]
            if(clienteDb.id.toString() === cliente.id.toString()){
                clienteDb.nome = cliente.nome
                clienteDb.cpf = cliente.cpf
                clienteDb.endereco = cliente.endereco
                clienteDb.telefone = cliente.telefone
                clienteDb.valor = cliente.valor
                exist = true
                break
            }
        }

        if(!exist){
            const objectLiteral = {...cliente}
            listaClientes.push(objectLiteral)
        }

        Cliente.salvarJsonDisco(listaClientes)
    }

    static async salvarJsonDisco(clientes){
        const fs = require('fs');

        try {
            fs.writeFileSync('db/clientes.json', JSON.stringify(clientes), {encoding: "utf8"});
        } catch (err) {
            console.error(err);
        }
    }

    static async lista(){
        let clientes = []
        const fs = require('fs');

        try {
            const jsonClientes = await fs.readFileSync('db/clientes.json', 'utf8');
            clientes = JSON.parse(jsonClientes)
        } catch (err) {
            console.error(err);
        }
        
        return clientes
    }
}