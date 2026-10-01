const API_URL = "https://jsonplaceholder.typicode.com/users";

let utilizadores = [];

const campoPesquisa = document.getElementById("campoPesquisa");
const listaUtilizadores = document.getElementById("listaUtilizadores");
const contador = document.getElementById("contador");
const mensagemSemResultados = document.getElementById("mensagemSemResultados");


// Obter os utilizadores da API
async function obterUtilizadores() {
    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro ao obter os dados da API.");
        }

        // Converter a resposta para JSON
        utilizadores = await resposta.json();

        apresentarUtilizadores(utilizadores);

    } catch (erro) {
        console.error(erro);
        contador.textContent = "Ocorreu um erro ao carregar os utilizadores.";
    }
}


// Apresentar os utilizadores na página
function apresentarUtilizadores(lista) {
    listaUtilizadores.innerHTML = "";

    contador.textContent = `Utilizadores encontrados: ${lista.length}`;

    if (lista.length === 0) {
        mensagemSemResultados.style.display = "block";
        return;
    }

    mensagemSemResultados.style.display = "none";

    lista.forEach(function(utilizador) {
        const cartao = document.createElement("article");

        cartao.classList.add("utilizador");

        cartao.innerHTML = `
            <h2>${utilizador.name}</h2>

            <p><strong>Username:</strong> ${utilizador.username}</p>
            <p><strong>Email:</strong> ${utilizador.email}</p>
            <p><strong>Cidade:</strong> ${utilizador.address.city}</p>
            <p><strong>Empresa:</strong> ${utilizador.company.name}</p>

            <div class="detalhes">
                <p><strong>Telefone:</strong> ${utilizador.phone}</p>
                <p>
                    <strong>Website:</strong>
                    <a href="https://${utilizador.website}" target="_blank">
                        ${utilizador.website}
                    </a>
                </p>
            </div>
        `;

        listaUtilizadores.appendChild(cartao);
    });
}


// Pesquisar por nome ou cidade
function pesquisarUtilizadores() {
    const pesquisa = campoPesquisa.value.toLowerCase().trim();

    const resultados = utilizadores.filter(function(utilizador) {
        const nome = utilizador.name.toLowerCase();
        const cidade = utilizador.address.city.toLowerCase();

        return nome.includes(pesquisa) || cidade.includes(pesquisa);
    });

    apresentarUtilizadores(resultados);
}


// Executar a pesquisa sempre que o utilizador escrever
campoPesquisa.addEventListener("input", pesquisarUtilizadores);


// Obter os dados automaticamente quando a página abre
obterUtilizadores();
