let totalItens = 0;

const botoes = document.querySelectorAll('.produto-item button');

botoes.forEach((botao) => {
    botao.addEventListener('click', (evento) => {
        const produtoItem = evento.target.closest('.produto-item');
        const nomeProduto = produtoItem.querySelector('h3').textContent;
        const precoProduto = produtoItem.querySelector('.preco').textContent;

        totalItens++;
        
        alert(`${nomeProduto} (${precoProduto}) foi adicionado ao carrinho!\nTotal de itens no carrinho: ${totalItens}`);
    });
});