// Função principal de login iniciada pelo clique no botão
async function realizarLogin() {
    // Captura o elemento de input e o local da mensagem de erro
    const campoMac = document.getElementById('input_mac');
    const mensagemErro = document.getElementById('mensagem_erro');

    // 1. Captura o valor, remove espaços extras (.trim) e converte para minúsculo (.toLowerCase)
    // Isso é essencial para bater com o banco de dados que vimos no phpMyAdmin
    const macDigitado = campoMac.value.trim().toLowerCase();

    // Verifica se o campo não está vazio
    if (!macDigitado) {
        alert("Por favor, digite o endereço MAC do seu dispositivo.");
        return;
    }

    // URL da sua API na Hostinger
    const urlAPI = `https://skkilarena.com.br/check_mac.php?mac=${macDigitado}`;

    try {
        // Faz a chamada para o servidor Hostinger
        const response = await fetch(urlAPI);
        
        if (!response.ok) {
            throw new Error("Servidor fora do ar ou erro na rede.");
        }

        const data = await response.json();

        // Lógica de resposta baseada no seu novo check_mac.php
        if (data.status === "success") {
            console.log("Login realizado com sucesso para: " + data.cliente);

            // Salva os dados retornados no navegador (LocalStorage) para usar no Player
            localStorage.setItem('cliente_nome', data.cliente);
            localStorage.setItem('cliente_lista', data.url_m3u);
            localStorage.setItem('cliente_validade', data.validade);
            localStorage.setItem('cliente_status', data.status_conta);

            // Redireciona para a página do player (player.html)
            window.location.href = "player.html";
        } else {
            // Exibe a mensagem de erro caso o MAC não seja encontrado
            if (mensagemErro) {
                mensagemErro.style.display = "block";
                mensagemErro.innerText = "Acesso Negado: " + data.message;
            } else {
                alert("Acesso Negado: " + data.message);
            }
        }

    } catch (error) {
        console.error("Erro na autenticação:", error);
        alert("Erro técnico: Não foi possível conectar ao servidor.");
    }
}

// Atalho: permite que o usuário aperte "Enter" no teclado para logar
document.getElementById('input_mac').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        realizarLogin();
    }
});
