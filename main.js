$(document).ready(function() {
    // Aplica a máscara ao campo de CEP
    $('#cep').mask('00000-000');

    // Evento de clique no botão de buscar CEP
    $('#btn-buscar-cep').click(function() {
        const cep = $('#cep').val().replace(/\D/g, ''); // Remove caracteres não numéricos
        const endpoint = `https://viacep.com.br/ws/${cep}/json/`; // Endpoint da API de busca de CEP
        const botao = $(this);

        // Exibe o spinner enquanto a busca está em andamento
        $(botao).find('span').removeClass('d-none');

        // Faz a requisição Ajax
        $.ajax({
            url: endpoint,
            dataType: 'json',
            success: function(resposta) {
                // Verifica se a resposta contém o logradouro
                if (resposta && !resposta.erro) {
                    const logradouro = resposta.logradouro;
                    const bairro = resposta.bairro;
                    const cidade = resposta.localidade;
                    const estado = resposta.uf;
                    const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`;
                    $('#endereco').val(endereco); // Preenche o campo "endereço" com o resultado da busca
                } else {
                    $('#endereco').val('CEP não encontrado'); // Exibe mensagem de erro caso o CEP não seja encontrado
                }
            },
            error: function() {
                $('#endereco').val('Erro ao buscar CEP'); // Exibe mensagem de erro em caso de falha na requisição
            },
            complete: function() {
                // Esconde o spinner após a requisição
                $(botao).find('span').addClass('d-none');
            }
        });
    });
});
