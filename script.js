// Função principal de login iniciada pelo clique no botão
async function realizarLogin() {
    // Pega o valor digitado no campo de input do MAC
    const campoMac = document.getElementById('input_mac');
    const macDigitado = campoMac.value.trim();
    const mensagemErro = document.getElementById('mensagem_erro');

    // Verifica se o campo não está vazio
    if (!macDigitado) {
        alert("Por favor, digite o endereço MAC do seu dispositivo.");
        return;
    }

    // URL da sua API na Hostinger (ajustada para o seu domínio)
    const urlAPI = `https://skkilarena.com.br/check_mac.php?mac=${macDigitado}`;

    try {
        // Faz a chamada para o servidor
        const response = await fetch(urlAPI);
        
        // Verifica se a resposta do servidor está OK
        if (!response.ok) {
            throw new Error("Erro na rede ou servidor indisponível.");
        }

        const data = await response.json();

        // Lógica baseada no retorno do PHP
        if (data.status === "success") {
            console.log("Acesso autorizado para: " + data.cliente);

            // Salva os dados da sua tabela no navegador para usar no Player
            localStorage.setItem('cliente_nome', data.cliente);
            localStorage.setItem('cliente_lista', data.url_m3u);
            localStorage.setItem('cliente_validade', data.validade);
            localStorage.setItem('cliente_status', data.status_conta);

            // Redireciona para a página do player
            window.location.href = "player.html";
        } else {
            // Caso o MAC não exista ou esteja incorreto
            if (mensagemErro) {
                mensagemErro.style.display = "block";
                mensagemErro.innerText = "Acesso Negado: " + data.message;
            } else {
                alert("Acesso Negado: " + data.message);
            }
        }

    } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
        alert("Erro técnico: Não foi possível conectar ao servidor de autenticação.");
    }
}

// Opcional: Permite apertar "Enter" no teclado para logar
document.getElementById('input_mac').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        realizarLogin();
    }
});
