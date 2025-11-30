// src/pages/Relatorios.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Relatorios.module.css';

function Relatorios() {
  const [listaDeAeronaves, setListaDeAeronaves] = useState([]);
  const [aeronaveSelecionada, setAeronaveSelecionada] = useState('');

  
  useEffect(() => {
    async function carregar() {
      try {
        const res = await axios.get('http://localhost:3000/aeronaves');
        setListaDeAeronaves(res.data);
      } catch (error) {
        console.error("Erro ao carregar aeronaves");
      }
    }
    carregar();
  }, []);

  
  const handleGerarRelatorio = async () => {
    if (!aeronaveSelecionada) {
      alert("Selecione uma aeronave primeiro.");
      return;
    }

    try {
     
      const res = await axios.get(`http://localhost:3000/aeronaves/${aeronaveSelecionada}`);
      const dados = res.data;

      
      let conteudo = `=== RELATÓRIO FINAL DE PRODUÇÃO ===\n`;
      conteudo += `Data de Emissão: ${new Date().toLocaleString()}\n\n`;
      
      conteudo += `[1] DADOS DA AERONAVE\n`;
      conteudo += `Código: ${dados.codigo}\n`;
      conteudo += `Modelo: ${dados.modelo}\n`;
      conteudo += `Tipo: ${dados.tipo}\n`;
      conteudo += `Capacidade: ${dados.capacidade} passageiros\n`;
      conteudo += `Alcance: ${dados.alcance} km\n\n`;

      conteudo += `[2] PEÇAS UTILIZADAS\n`;
      if (dados.pecas && dados.pecas.length > 0) {
        dados.pecas.forEach(p => {
          conteudo += `- ${p.nome} (${p.fornecedor}) [Status: ${p.status}]\n`;
        });
      } else {
        conteudo += `- Nenhuma peça vinculada.\n`;
      }
      conteudo += `\n`;

      conteudo += `[3] ETAPAS DE PRODUÇÃO E RESPONSÁVEIS\n`;
      if (dados.etapas && dados.etapas.length > 0) {
        dados.etapas.forEach(e => {
          conteudo += `* Etapa: ${e.nome}\n`;
          conteudo += `  Status: ${e.status}\n`;
          conteudo += `  Prazo: ${new Date(e.prazo).toLocaleDateString()}\n`;
          conteudo += `  Responsáveis: `;
          if (e.funcionarios && e.funcionarios.length > 0) {
            conteudo += e.funcionarios.map(f => f.nome).join(', ');
          } else {
            conteudo += `Nenhum alocado`;
          }
          conteudo += `\n\n`;
        });
      } else {
        conteudo += `- Nenhuma etapa registrada.\n\n`;
      }

      conteudo += `[4] RESULTADOS DOS TESTES\n`;
      if (dados.testes && dados.testes.length > 0) {
        dados.testes.forEach(t => {
          conteudo += `- Teste ${t.tipo}: ${t.resultado} (Data: ${new Date(t.data).toLocaleDateString()})\n`;
        });
      } else {
        conteudo += `- Nenhum teste realizado.\n`;
      }

      
      const element = document.createElement("a");
      const file = new Blob([conteudo], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `Relatorio_${dados.codigo}.txt`; 
      document.body.appendChild(element); 
      element.click();
      document.body.removeChild(element);

    } catch (error) {
      console.error(error);
      alert("Erro ao gerar relatório.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Gerador de Relatório Final</h1>
      
      <p className={styles.description}>
        Selecione uma aeronave concluída para gerar o relatório detalhado de entrega (formato .txt).
      </p>

      <select 
        className={styles.selectAeronave}
        value={aeronaveSelecionada}
        onChange={(e) => setAeronaveSelecionada(e.target.value)}
      >
        <option value="" disabled>Selecione a aeronave...</option>
        {listaDeAeronaves.map(a => (
          <option key={a.id} value={a.id}>{a.codigo} - {a.modelo}</option>
        ))}
      </select>

      <button 
        className={styles.reportButton}
        onClick={handleGerarRelatorio}
        disabled={!aeronaveSelecionada} 
      >
        Baixar Relatório .TXT
      </button>
    </div>
  );
}

export default Relatorios;