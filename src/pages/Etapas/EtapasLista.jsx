// src/pages/Etapas/EtapasLista.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './EtapasLista.module.css';
import Modal from '../../components/Modal/Modal.jsx';

function EtapasLista() {
  
  const [listaDeEtapas, setListaDeEtapas] = useState([]);
  const [listaDeAeronaves, setListaDeAeronaves] = useState([]);
  const [listaDeFuncionarios, setListaDeFuncionarios] = useState([]);
  
  
  const [isCadastrarModalOpen, setIsCadastrarModalOpen] = useState(false);
  const [isAlocarModalOpen, setIsAlocarModalOpen] = useState(false);
  
  
  const [isVisualizarModalOpen, setIsVisualizarModalOpen] = useState(false);
  const [etapaDetalhes, setEtapaDetalhes] = useState(null);

 
  const [novoNome, setNovoNome] = useState('');
  const [novoPrazo, setNovoPrazo] = useState('');
  const [novaAeronaveId, setNovaAeronaveId] = useState('');

  
  const [etapaSelecionadaId, setEtapaSelecionadaId] = useState('');
  const [funcionarioSelecionadoId, setFuncionarioSelecionadoId] = useState('');

 
  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [resEtapas, resAeronaves, resFuncionarios] = await Promise.all([
        axios.get('http://localhost:3000/etapas'),
        axios.get('http://localhost:3000/aeronaves'),
        axios.get('http://localhost:3000/funcionarios')
      ]);

      setListaDeEtapas(resEtapas.data);
      setListaDeAeronaves(resAeronaves.data);
      setListaDeFuncionarios(resFuncionarios.data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  
  const handleVisualizar = async (etapaId) => {
    try {
      const res = await axios.get(`http://localhost:3000/etapas/${etapaId}`);
      setEtapaDetalhes(res.data);
      setIsVisualizarModalOpen(true);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar detalhes da etapa.");
    }
  };

  
  const handleCadastrarSubmit = async (e) => {
    e.preventDefault();

    if (!novaAeronaveId) {
      alert("É necessário selecionar uma Aeronave para criar uma etapa.");
      return;
    }

    try {
      const novaEtapa = {
        nome: novoNome,
        prazo: novoPrazo,
        status: 'PENDENTE',
        aeronaveId: novaAeronaveId
      };

      await axios.post('http://localhost:3000/etapas', novaEtapa);
      
      alert("Etapa cadastrada com sucesso!");
      carregarDados();

      setIsCadastrarModalOpen(false);
      setNovoNome('');
      setNovoPrazo('');
      setNovaAeronaveId('');

    } catch (error) {
      console.error("Erro ao criar etapa:", error);
      alert("Erro ao criar etapa. Verifique os dados.");
    }
  };

 
  const handleAlocarSubmit = (e) => {
    e.preventDefault();
   
    alert(`Simulação: Funcionário ${funcionarioSelecionadoId} alocado à Etapa ${etapaSelecionadaId}!`);
    setIsAlocarModalOpen(false);
  };

  return (
    <div>
      <div className={styles.header}>
        <h1>Lista de Etapas da Produção</h1>
        <div className={styles.headerActions}>
          <button className={styles.secondaryButton} onClick={() => setIsAlocarModalOpen(true)}>
            Alocar Funcionário
          </button>
          <button className={styles.primaryButton} onClick={() => setIsCadastrarModalOpen(true)}>
            Cadastrar Etapa
          </button>
        </div>
      </div>

      <table className={styles.tabelaEtapas}>
        <thead>
          <tr>
            <th>Nome da Etapa</th>
            <th>Aeronave</th>
            <th>Prazo</th>
            <th>Status</th>
            <th>Equipe</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaDeEtapas.length === 0 && <tr><td colSpan="6" align="center">Nenhuma etapa cadastrada.</td></tr>}
          {listaDeEtapas.map((etapa) => (
            <tr key={etapa.id}>
              <td>{etapa.nome}</td>
              <td>{etapa.aeronave ? etapa.aeronave.codigo : 'N/A'}</td>
              <td>{new Date(etapa.prazo).toLocaleDateString()}</td>
              <td>{etapa.status}</td>
              <td>{etapa.funcionarios ? etapa.funcionarios.length : 0}</td>
              <td>
                <button className={styles.actionButton} onClick={() => handleVisualizar(etapa.id)}>
                  Visualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {}
      {isCadastrarModalOpen && (
        <Modal title="Cadastrar Nova Etapa" onClose={() => setIsCadastrarModalOpen(false)}>
          <form className={styles.modalForm} onSubmit={handleCadastrarSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="nome">Nome da Etapa</label>
              <input type="text" id="nome" className={styles.formInput} placeholder="Ex: Montagem das Asas" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="aeronave">Aeronave Vinculada</label>
              <select id="aeronave" className={styles.formSelect} value={novaAeronaveId} onChange={(e) => setNovaAeronaveId(e.target.value)} required>
                <option value="" disabled>Selecione uma aeronave...</option>
                {listaDeAeronaves.map(a => (
                  <option key={a.id} value={a.id}>{a.codigo} - {a.modelo}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="prazo">Prazo</label>
              <input type="date" id="prazo" className={styles.formInput} value={novoPrazo} onChange={(e) => setNovoPrazo(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label>Status Inicial</label>
              <input type="text" className={styles.formInput} value="PENDENTE" disabled />
            </div>
            <button type="submit" className={styles.modalSubmitButton}>Salvar Etapa</button>
          </form>
        </Modal>
      )}

      {}
      {isAlocarModalOpen && (
        <Modal title="Alocar Funcionário" onClose={() => setIsAlocarModalOpen(false)}>
          <form className={styles.modalForm} onSubmit={handleAlocarSubmit}>
            <div className={styles.formGroup}>
              <label>Etapa</label>
              <select className={styles.formSelect} value={etapaSelecionadaId} onChange={(e) => setEtapaSelecionadaId(e.target.value)}>
                <option value="" disabled>Selecione a etapa...</option>
                {listaDeEtapas.map(e => (
                  <option key={e.id} value={e.id}>{e.nome}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Funcionário</label>
              <select className={styles.formSelect} value={funcionarioSelecionadoId} onChange={(e) => setFuncionarioSelecionadoId(e.target.value)}>
                <option value="" disabled>Selecione o funcionário...</option>
                {listaDeFuncionarios.map(f => (
                  <option key={f.id} value={f.id}>{f.nome}</option>
                ))}
              </select>
            </div>
            <button type="submit" className={styles.modalSubmitButton}>Alocar</button>
          </form>
        </Modal>
      )}

      {}
      {isVisualizarModalOpen && etapaDetalhes && (
        <Modal title={`Etapa: ${etapaDetalhes.nome}`} onClose={() => setIsVisualizarModalOpen(false)}>
          <div style={{ padding: '10px' }}>
            <p><strong>Prazo:</strong> {new Date(etapaDetalhes.prazo).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {etapaDetalhes.status}</p>
            <p><strong>Aeronave:</strong> {etapaDetalhes.aeronave?.codigo} ({etapaDetalhes.aeronave?.modelo})</p>
            
            <hr style={{margin: '15px 0', borderTop: '1px solid #eee'}} />
            
            <h3>Equipe Alocada</h3>
            {etapaDetalhes.funcionarios && etapaDetalhes.funcionarios.length > 0 ? (
              <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                {etapaDetalhes.funcionarios.map(func => (
                  <li key={func.id}>{func.nome} ({func.nivelPermissao})</li>
                ))}
              </ul>
            ) : (
              <p style={{color: '#666', fontStyle: 'italic'}}>Nenhum funcionário alocado.</p>
            )}

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <button 
                  className={styles.secondaryButton} 
                  style={{backgroundColor: '#6c757d', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                  onClick={() => setIsVisualizarModalOpen(false)}
                >
                  Fechar
                </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default EtapasLista;