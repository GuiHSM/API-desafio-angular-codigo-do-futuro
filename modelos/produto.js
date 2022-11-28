module.exports = class Produto {
    constructor(produto){
        this.id = produto?.id
        this.nome = produto?.nome
        this.descricao = produto?.descricao
        this.valor = produto?.valor
        this.qtd_estoque = produto?.qtd_estoque
    }


    // metodos staticos
    static async apagarPorId(id){
        const listaProdutos = await this.lista()
        const listaNova = []
        for(let i=0; i<listaProdutos.length; i++){
            const produtoDb = listaProdutos[i]
            if(produtoDb.id.toString() !== id.toString()){
                listaNova.push(produtoDb)
            }
        }

        Produto.salvarJsonDisco(listaNova)
    }
    
    static async buscaPorId(id){
        const listaProdutos = await this.lista()
        for(let i=0; i<listaProdutos.length; i++){
            const produtoDb = listaProdutos[i]
            if(produtoDb.id.toString() === id.toString()){
                return produtoDb
            }
        }

        return null
    }

    static async salvar(produto){
        const listaProdutos = await this.lista()
        let exist = false
        for(let i=0; i<listaProdutos.length; i++){
            const produtoDb = listaProdutos[i]
            if(produtoDb.id.toString() === produto.id.toString()){
                produtoDb.nome = produto.nome
                produtoDb.telefone = produto.telefone
                produtoDb.descricao = produto.descricao
                produtoDb.valor = produto.valor
                produtoDb.qtd_estoque = produto.qtd_estoque

                exist = true
                break
            }
        }

        if(!exist){
            const objectLiteral = {...produto}
            listaProdutos.push(objectLiteral)
        }

        Produto.salvarJsonDisco(listaProdutos)
    }

    static async salvarJsonDisco(produtos){
        const fs = require('fs');

        try {
            fs.writeFileSync('db/produtos.json', JSON.stringify(produtos), {encoding: "utf8"});
        } catch (err) {
            console.error(err);
        }
    }

    static async lista(){
        let produtos = []
        const fs = require('fs');

        try {
            const jsonProdutos = await fs.readFileSync('db/produtos.json', 'utf8');
            produtos = JSON.parse(jsonProdutos)
        } catch (err) {
            console.error(err);
        }
        
        return produtos
    }
}