document.getElementById('calcular').addEventListener('click', function () {
  // Capturando os valores inseridos
  const acertosP1 = parseInt(document.getElementById('acertosP1').value);
  const anuladasP1 = parseInt(document.getElementById('anuladasP1').value);
  const acertosP2 = document.getElementById('acertosP2').value ? parseInt(document.getElementById('acertosP2').value) : null;
  const anuladasP2 = document.getElementById('anuladasP2').value ? parseInt(document.getElementById('anuladasP2').value) : null;
  const acertosP3 = document.getElementById('acertosP3').value ? parseInt(document.getElementById('acertosP3').value) : null;
  const anuladasP3 = document.getElementById('anuladasP3').value ? parseInt(document.getElementById('anuladasP3').value) : null;

  // Validação
  if (
    acertosP1 + anuladasP1 > 20 ||
    (acertosP2 !== null && acertosP2 + anuladasP2 > 20) ||
    (acertosP3 !== null && acertosP3 + anuladasP3 > 20)
  ) {
    document.getElementById('resultado').textContent =
      'O total de questões (acertos + anuladas) não pode exceder 20 em cada prova.';
    return;
  }

  // Função para calcular a nota de uma prova
  function calcularNota(acertos, anuladas) {
    return ((acertos / (20 - anuladas)) * 10);
  }

  // Calcula as notas de cada prova
  const notaP1 = calcularNota(acertosP1, anuladasP1);
  const notaP2 = acertosP2 !== null ? calcularNota(acertosP2, anuladasP2) : null;
  const notaP3 = acertosP3 !== null ? calcularNota(acertosP3, anuladasP3) : null;

  // Calcula a média ponderada
  let somaPesos = 0;
  let somaNotas = 0;

  somaNotas += notaP1 * 1;
  somaPesos += 1;

  if (notaP2 !== null) {
    somaNotas += notaP2 * 2;
    somaPesos += 2;
  }

  if (notaP3 !== null) {
    somaNotas += notaP3 * 3;
    somaPesos += 3;
  }

  const mediaPonderada = somaNotas / somaPesos;

  // Exibindo a média ponderada
  document.getElementById('resultado').textContent =
    `A média ponderada até o momento é: ${mediaPonderada.toFixed(2)}`;

  // Cálculo de estimativa em quantidade de acertos
  if (somaPesos < 6) {
    const pontosRestantes = 7 * 6 - somaNotas; // Pontos necessários para média 7
    const pesosRestantes = 6 - somaPesos; // Pesos das provas restantes

    const notaNecessaria = pontosRestantes / pesosRestantes; // Média necessária nas provas restantes
    const acertosNecessarios = Math.ceil((notaNecessaria / 10) * 20); // Transformar média necessária em acertos

    document.getElementById('estimativa').textContent =
      `Você precisa acertar pelo menos ${acertosNecessarios} questões nas provas restantes para alcançar a média 7.`;
  } else {
    document.getElementById('estimativa').textContent =
      `Todas as provas foram feitas.`;
  }
});