$(document).ready(function(){
    console.log("Documento pronto"); // Adicione esta linha para verificar se o ready está funcionando
    // Aplica a máscara ao campo de CEP
    $('#cep').mask('00000-000'); 
    // Evento de clique no botão de buscar CEP
    $('#btn-buscar-cep').click(function() {
        console.log("Botão buscar clicado"); // Adicione esta linha para verificar se o clique está funcionando
        const cep = $('#cep').val(); // Recupera o valor digitado no campo de CEP
        const endpoint = `http://viacep.com.br/ws/${cep}/json`; // Endpoint da API de busca de CEP
        const botao = $(this);
        // Exibe o spinner enquanto a busca está em andamento
        $(botao).find('span').removeClass('d-none');
        // Faz a requisição Ajax
        $.ajax(endpoint)
            .done(function(resposta){
                console.log("Resposta da API:", resposta); // Adicione esta linha para verificar a resposta da API
                // Verifica se a resposta contém o logradouro
                if (resposta && resposta.logradouro) {
                    const logradouro = resposta.logradouro;
                    const bairro = resposta.bairro;
                    const cidade = resposta.localidade;
                    const estado = resposta.uf;
                    const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`;
                    $('#endereco').val(endereco); // Preenche o campo "endereço" com o resultado da busca
                } else {
                    $('#endereco').val('CEP não encontrado'); // Exibe mensagem de erro caso o CEP não seja encontrado
                }
                // Esconde o spinner após 3 segundos
                setTimeout(function(){
                    $(botao).find('span').addClass('d-none');
                }, 3000);
            })
            .fail(function() {
                // Em caso de falha na requisição, exibe um alerta
                alert('Erro ao buscar o CEP');
                $(botao).find('span').addClass('d-none');
            });
    });
});
