document.addEventListener('DOMContentLoaded', () => {
    let carrinho = JSON.parse(localStorage.getItem('carrinhoSalvo')) || [];

    const carrinhoMenu = document.getElementById('carrinho-menu');
    const abrirCarrinhoBtn = document.getElementById('abrir-carrinho');
    const fecharCarrinhoBtn = document.getElementById('fechar-carrinho');
    const carrinhoListaItens = document.getElementById('carrinho-lista-itens');
    const carrinhoContador = document.getElementById('carrinho-contador');
    const carrinhoTotal = document.getElementById('carrinho-total');
    
    const botaoFinalizar = document.getElementById('finalizar-pedido-btn');
    const painelStatus = document.getElementById('painel-status');
    const textoStatus = document.getElementById('texto-status');
    const barraProgresso = document.getElementById('barra-progresso');

    const seletorUnidade = document.getElementById('unidade');
    const produtos = document.querySelectorAll('.produto-item');

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
            localStorage.setItem('carrinhoSalvo', JSON.stringify(carrinho));
            return;
        }

        carrinhoListaItens.innerHTML = '';
        let valorTotal = 0;

        carrinho.forEach((item, indice) => {
            valorTotal += item.preco;

            const divItem = document.createElement('div');
            divItem.style.display = 'flex';
            divItem.style.justifyContent = 'space-between';
            divItem.style.alignItems = 'center';
            divItem.style.marginBottom = '10px';
            divItem.style.fontFamily = 'Arial, sans-serif';
            divItem.style.fontSize = '0.95rem';
            divItem.style.borderBottom = '1px solid #f3f3f3';
            divItem.style.paddingBottom = '5px';
            divItem.style.paddingLeft = '15px';
            divItem.style.paddingRight = '15px';

            divItem.innerHTML = `
                <div style="display: flex; flex-direction: column;">
                    <span>${item.nome}</span>
                    <span style="font-weight: bold; color: #8B4513; font-size: 0.85rem;">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
                </div>
                <button class="remover-item-btn" data-index="${indice}" style="background: none; border: none; color: #ff0000; font-weight: bold; cursor: pointer; font-size: 1.1rem; padding: 5px;">&times;</button>
            `;
            
            carrinhoListaItens.appendChild(divItem);
        });

        if (carrinhoTotal) {
            carrinhoTotal.textContent = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
        }

        const botoesRemover = document.querySelectorAll('.remover-item-btn');
        botoesRemover.forEach((botao) => {
            botao.addEventListener('click', (evento) => {
                const indexParaRemover = parseInt(evento.target.getAttribute('data-index'));
                carrinho.splice(indexParaRemover, 1);
                atualizarCarrinho();
            });
        });

        localStorage.setItem('carrinhoSalvo', JSON.stringify(carrinho));
    }

    if (botaoFinalizar) {
        botaoFinalizar.addEventListener('click', () => {
            if (carrinho.length === 0) {
                alert('Seu carrinho está vazio!');
                return;
            }

            if (carrinhoMenu) {
                carrinhoMenu.classList.remove('aberto');
            }

            carrinho = [];
            atualizarCarrinho();

            const botaoFecharStatus = document.getElementById('fechar-status-btn');
            if (botaoFecharStatus) {
                botaoFecharStatus.style.display = 'none';
                botaoFecharStatus.onclick = () => {
                    painelStatus.style.display = 'none';
                };
            }

            if (painelStatus) {
                painelStatus.style.display = 'block';
                textoStatus.textContent = 'Status: Pedido Recebido 📝';
                barraProgresso.style.width = '20%';

                setTimeout(() => {
                    textoStatus.textContent = 'Status: Em Preparo 🥞';
                    barraProgresso.style.width = '60%';
                }, 4000);

                setTimeout(() => {
                    textoStatus.textContent = 'Status: Pronto para Retirada! 🛵';
                    barraProgresso.style.width = '100%';
                    barraProgresso.style.backgroundColor = '#28a745';
                    
                    if (botaoFecharStatus) {
                        botaoFecharStatus.style.display = 'block';
                    }
                }, 8000);
            }
        });
    }

    if (seletorUnidade) {
        seletorUnidade.addEventListener('change', (e) => {
            carrinho = [];
            atualizarCarrinho();
            localStorage.setItem('carrinhoSalvo', JSON.stringify(carrinho));

            const unidadeEscolhida = e.target.value;

            produtos.forEach(produto => {
                const unidadeDoProduto = produto.getAttribute('data-unidade');

                if (unidadeDoProduto === unidadeEscolhida || unidadeDoProduto === 'todas') {
                    produto.style.display = 'block';
                } else {
                    produto.style.display = 'none'; 
                }
            });
        });
    }

    atualizarCarrinho();

    const menuUsuario = document.getElementById('menu-usuario');
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (menuUsuario && usuarioLogado) {
        menuUsuario.innerHTML = `
            <span style="color: #8B4513; font-weight: bold; margin-right: 15px; font-family: Arial, sans-serif;">Olá, ${usuarioLogado}! 👋</span>
            <a href="#" id="botao-sair" style="color: #8B4513; text-decoration: none; font-weight: bold; font-family: Arial, sans-serif;">Sair</a>
        `;

        const botaoSair = document.getElementById('botao-sair');
        if (botaoSair) {
            botaoSair.addEventListener('click', (evento) => {
                evento.preventDefault();
                localStorage.removeItem('usuarioLogado');
                window.location.reload();
            });
        }
    }
});

const campoDataNascimento = document.getElementById('data_nascimento');
if (campoDataNascimento) {
    const hoje = new Date().toISOString().split('T')[0];
    campoDataNascimento.max = hoje;
}

const formularioCadastro = document.forms['cadastra_form'];

if (formularioCadastro) {
    formularioCadastro.addEventListener('submit', (evento) => {
        evento.preventDefault(); 

        const senha = document.getElementById('password').value;
        const confirmarSenha = document.getElementById('confirm_password').value;

        if (senha !== confirmarSenha) {
            alert('Atenção: As senhas digitadas não são iguais! Por favor, verifique.');
            const campoConfirmar = document.getElementById('confirm_password');
            campoConfirmar.focus();
            campoConfirmar.style.borderColor = '#ff0000';
            return; 
        }

        const avisoSucesso = document.createElement('div');
        avisoSucesso.className = 'aviso-sucesso-animado';
        avisoSucesso.innerHTML = '🎉 Conta criada com sucesso! Redirecionando...';
        
        document.body.appendChild(avisoSucesso);

        const botao = document.querySelector('.botao-cadastro');
        if (botao) {
            botao.value = 'Carregando...';
            botao.disabled = true;
            botao.style.opacity = '0.7';
        }

        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });
}

const formularioLoginUnico = document.forms['login_form'] || document.querySelector('.login-card form') || document.querySelector('form');

if (formularioLoginUnico) {
    formularioLoginUnico.addEventListener('submit', (evento) => {
        evento.preventDefault();
        
        const campoUsuario = document.getElementById('username') || document.querySelector('input[type="text"]');
        const loginDigitado = campoUsuario ? campoUsuario.value.trim() : '';
        
        if (loginDigitado !== '') {
            localStorage.setItem('usuarioLogado', loginDigitado);
            window.location.href = '../index.html';
        } else {
            alert('Por favor, digite o seu usuário.');
        }
    });
}