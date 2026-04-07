// Função para verificar o acesso via MAC
async function realizarLogin() {
    const macDigitado = document.getElementById('input_mac').value; // Pega o MAC do campo de texto
    const urlAPI = `https://skkilarena.com.br/check_mac.php?mac=${macDigitado}`;

    try {
        const response = await fetch(urlAPI);
        const data = await response.json();

        if (data.status === "success") {
            // Se o MAC existir, salva os dados e entra
            localStorage.setItem('user_iptv', data.user);
            localStorage.setItem('pass_iptv', data.pass);
            localStorage.setItem('dns_iptv', data.dns);
            
            window.location.href = "player.html"; // Vai para a tela do player
        } else {
            alert("Erro: " + data.message);
        }
    } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
    }
}
