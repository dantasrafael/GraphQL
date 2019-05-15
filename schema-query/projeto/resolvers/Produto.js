module.exports = {
    precoComDesconto(produto) {
        return produto.preco - produto.desconto
    }    
}