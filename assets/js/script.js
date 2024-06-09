function formatarMoeda(input) {
    let value = input.value.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
    value = (value / 100).toFixed(2) + ''; // Divide por 100 e fixa duas casas decimais
    value = value.replace('.', ','); // Substitui o ponto por vírgula
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); // Adiciona o ponto como separador de milhar
    input.value = value;
}

function calcular() {
    const inptTotal_tubos = document.querySelector('input#tubos');
    const inptTubos100 = document.querySelector('input#tubos-de-100');
    const inptNao_tubos = document.querySelector('input#nao-tubos');
    const inptCpvc = document.querySelector('input#cpvc');
    const resultado = document.querySelector('div#resultado');

    // Conversão para Número
    const total_tubos = parseFloat(inptTotal_tubos.value.replace(/\./g, '').replace(',', '.'));
    const tubos100 = parseFloat(inptTubos100.value.replace(/\./g, '').replace(',', '.'));
    const nao_tubos = parseFloat(inptNao_tubos.value.replace(/\./g, '').replace(',', '.'));
    const cpvc = parseFloat(inptCpvc.value.replace(/\./g, '').replace(',', '.'));

    // Processamento
    const tubos_conexoes = total_tubos + nao_tubos;
    const total_pedido = tubos_conexoes + cpvc;
    const perc_tubos = (total_tubos / tubos_conexoes) * 100;
    const perc_tubos100 = (tubos100 / total_tubos) * 100;

    saida(total_tubos, nao_tubos, tubos100, tubos_conexoes, total_pedido, perc_tubos, perc_tubos100, cpvc);
    atualizarCoresPorcentagens(perc_tubos, perc_tubos100);
}

function atualizarCoresPorcentagens(perc_tubos, perc_tubos100) {
    const td_tubos = document.querySelector("td#prct-tubos");
    const td_tubos100 = document.querySelector("td#prct-tubos-100");

    td_tubos.style.background = (perc_tubos > 60) ? 'red' : 'green';
    td_tubos100.style.background = (perc_tubos100 > 40) ? 'red' : 'green';
}

function saida(total_tubos, nao_tubos, tubos100, tubos_conexoes, total_pedido, perc_tubos, perc_tubos100, cpvc) {
    const modalBody = document.querySelector('#modalBody');
    modalBody.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Resumo do Pedido</h5>
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <th scope="row">Total Tubos</th>
                            <td>${total_tubos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                        </tr>
                        <tr>
                            <th scope="row">Total Tubos de 100</th>
                            <td>${tubos100.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                        </tr>
                        <tr>
                            <th scope="row">CPVC</th>
                            <td>${cpvc.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                        </tr>
                        <tr>
                            <th scope="row">Não Tubos</th>
                            <td>${nao_tubos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                        </tr>
                        <tr>
                            <th scope="row">Tubos + Conexões</th>
                            <td>${tubos_conexoes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                        </tr>
                        <tr>
                            <th scope="row">Total do Pedido</th>
                            <td>${total_pedido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                        </tr>
                        <tr>
                            <th scope="row">% Tubos</th>
                            <td id="prct-tubos">${perc_tubos.toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <th scope="row">% Tubos de 100</th>
                            <td id="prct-tubos-100">${perc_tubos100.toFixed(2)}%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>`;
    // Exibir a modal
    $('#modalResultado').modal('show');
}
/*
function saida(total_tubos, nao_tubos, tubos100, tubos_conexoes, total_pedido, perc_tubos, perc_tubos100, cpvc) {
    const resultado = document.querySelector('div#resultado');
    resultado.style.display = 'flex';
    resultado.innerHTML = `
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Resumo do Pedido</h5>
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <th scope="row">Total Tubos</th>
                        <td>${total_tubos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    </tr>
                    <tr>
                        <th scope="row">Total Tubos de 100</th>
                        <td>${tubos100.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    </tr>
                    <tr>
                        <th scope="row">CPVC</th>
                        <td>${cpvc.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    </tr>
                    <tr>
                        <th scope="row">Não Tubos</th>
                        <td>${nao_tubos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    </tr>
                    <tr>
                        <th scope="row">Tubos + Conexões</th>
                        <td>${tubos_conexoes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    </tr>
                    <tr>
                        <th scope="row">Total do Pedido</th>
                        <td>${total_pedido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    </tr>
                    <tr>
                        <th scope="row">% Tubos</th>
                        <td id="prct-tubos">${perc_tubos.toFixed(2)}%</td>
                    </tr>
                    <tr>
                        <th scope="row">% Tubos de 100</th>
                        <td id="prct-tubos-100">${perc_tubos100.toFixed(2)}%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`;
}
    */

function limpar() {
    const resultado = document.querySelector('div#resultado');
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => input.value = '');
    resultado.innerHTML = '';
    resultado.style.display = 'none';
}