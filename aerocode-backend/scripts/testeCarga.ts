import axios from 'axios';


const URL_ALVO = 'http://localhost:3000/aeronaves';

async function fazerRequisicao(idUsuario: number): Promise<number> {
  const inicio = Date.now();
  
  try {
    await axios.get(URL_ALVO);
    const fim = Date.now();
    const tempoTotal = fim - inicio; 
    return tempoTotal;
  } catch (error: any) {
    console.error(`Erro no usuário ${idUsuario}:`, error.message);
    return 0;
  }
}

async function simularCenario(qtdUsuarios: number) {
  console.log(`\n--- INICIANDO TESTE COM ${qtdUsuarios} USUÁRIO(S) SIMULTÂNEO(S) ---`);
  
  const promessas: Promise<number>[] = [];
  
  for (let i = 0; i < qtdUsuarios; i++) {
    promessas.push(fazerRequisicao(i + 1));
  }

  const tempos = await Promise.all(promessas);
  
  const soma = tempos.reduce((a, b) => a + b, 0);
  const media = soma / tempos.length;

  console.log(`> Média de Tempo de Resposta (Cliente): ${media.toFixed(2)} ms`);
  console.log(`> Verifique o terminal do servidor para ver o Tempo de Processamento.`);
}

async function rodarTestes() {
  console.log("Iniciando bateria de testes...");
  
  
  await simularCenario(1);
  await new Promise(r => setTimeout(r, 2000));

  
  await simularCenario(5);
  await new Promise(r => setTimeout(r, 2000));

  
  await simularCenario(10);
}

rodarTestes();