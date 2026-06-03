document.addEventListener('DOMContentLoaded', () => {
    let carrinho = [];

    const carrinhoMenu = document.getElementById('carrinho-menu');
    const abrirCarrinhoBtn = document.getElementById('abrir-carrinho');
    const fecharCarrinhoBtn = document.getElementById('fechar-carrinho');
    const carrinhoListaItens = document.getElementById('carrinho-lista-itens');
    const carrinhoContador = document.getElementById('carrinho-contador');
    const carrinhoTotal = document.getElementById('carrinho-total');

    if (abrirCarrinhoBtn && carrinhoMenu) {
        abrirCarrinhoBtn.addEventListener('click', () => {
            carrinhoMenu.classList.add('aberto');
        });
    }

    if (fecharCarrinhoBtn && carrinhoMenu) {
        fecharCarrinhoBtn.addEventListener('click', () => {
            carrinhoMenu.classList.remove('aberto');
        });
    }

    const botoesAdicionar = document.querySelectorAll('.produto-item button');

    botoesAdicionar.forEach((botao) => {
        botao.addEventListener('click', (evento) => {
            const produtoItem = evento.target.closest('.produto-item');
            if (!produtoItem) return;

            const nome = produtoItem.querySelector('h3').textContent;
            const precoTexto = produtoItem.querySelector('.preco').textContent;
            
            const preco = parseFloat(precoTexto.replace('R$', '').replace(',', '.').trim());

            carrinho.push({ nome, preco });
            
            atualizarCarrinho();
            
            if (carrinhoMenu) {
                carrinhoMenu.classList.add('aberto');
            }
        });
    });

    function atualizarCarrinho() {
        if (carrinhoContador) {
            carrinhoContador.textContent = carrinho.length;
        }

        if (!carrinhoListaItens) return;

        if (carrinho.length === 0) {
            carrinhoListaItens.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
            if (carrinhoTotal) carrinhoTotal.textContent = 'R$ 0,00';
            return;
        }

        carrinhoListaItens.innerHTML = '';
        let valorTotal = 0;

        carrinho.forEach((item) => {
            valorTotal += item.preco;

            const divItem = document.createElement('div');
            divItem.style.display = 'flex';
            divItem.style.justifyContent = 'space-between';
            divItem.style.marginBottom = '10px';
            divItem.style.fontFamily = 'Arial, sans-serif';
            divItem.style.fontSize = '0.95rem';
            divItem.style.borderBottom = '1px solid #f3f3f3';
            divItem.style.paddingBottom = '5px';
            divItem.style.paddingLeft = '15px';
            divItem.style.paddingRight = '15px';

            divItem.innerHTML = `
                <span>${item.nome}</span>
                <span style="font-weight: bold; color: #8B4513;">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
            `;
            
            carrinhoListaItens.appendChild(divItem);
        });

        if (carrinhoTotal) {
            carrinhoTotal.textContent = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
        }
    }
});

const formularioCadastro = document.forms['cadastra_form'];

if (formularioCadastro) {
    formularioCadastro.addEventListener('submit', (evento) => {
        const senha = document.getElementById('password').value;
        const confirmarSenha = document.getElementById('confirm_password').value;

        if (senha !== confirmarSenha) {
            evento.preventDefault();
            
            alert('Atenção: As senhas digitadas não são iguais! Por favor, verifique.');
            
            const campoConfirmar = document.getElementById('confirm_password');
            campoConfirmar.focus();
            campoConfirmar.style.borderColor = '#ff0000';
        }
    });
}