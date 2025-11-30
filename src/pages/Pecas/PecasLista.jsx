// src/pages/Pecas/PecasLista.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './PecasLista.module.css';
import Modal from '../../components/Modal/Modal.jsx';

function PecasLista() {
  const [listaDePecas, setListaDePecas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // --- NOVO: Estado para Visualização ---
  const [isVisualizarModalOpen, setIsVisualizarModalOpen] = useState(false);
  const [pecaDetalhes, setPecaDetalhes] = useState(null);

  // Estados do formulário
  const [novoNome, setNovoNome] = useState('');
  const [novoFornecedor, setNovoFornecedor] = useState('');
  const [novoTipo, setNovoTipo] = useState('NACIONAL');
  const [novoStatus, setNovoStatus] = useState('EM_PRODUCAO');

  // --- CARREGAR DADOS ---
  useEffect(() => {
    carregarPecas();
  }, []);

  const carregarPecas = async () => {
    try {
      const resposta = await axios.get('http://localhost:3000/pecas');
      setListaDePecas(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar peças:", error);
    }
  };

  // --- NOVO: HANDLE VISUALIZAR (Busca dados completos) ---
  const handleVisualizar = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/pecas/${id}`);
      setPecaDetalhes(res.data);
      setIsVisualizarModalOpen(true);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar detalhes da peça.");
    }
  };

  // --- SALVAR DADOS ---
  const handleCadastrarSubmit = async (e) => {
    e.preventDefault();

    try {
      const novaPeca = {
        nome: novoNome,
        fornecedor: novoFornecedor,
        tipo: novoTipo,
        status: novoStatus,
      };

      await axios.post('http://localhost:3000/pecas', novaPeca);
      
      alert("Peça cadastrada com sucesso!");
      carregarPecas(); 
      
      setIsModalOpen(false);
      setNovoNome('');
      setNovoFornecedor('');
      setNovoTipo('NACIONAL');
      setNovoStatus('EM_PRODUCAO');

    } catch (error) {
      console.error("Erro ao cadastrar peça:", error);
      alert("Erro ao cadastrar peça.");
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h1>Lista de Peças</h1>
        <button className={styles.cadastrarButton} onClick={() => setIsModalOpen(true)}>
          Cadastrar Peça
        </button>
      </div>

      <table className={styles.tabelaPecas}>
        <thead>
          <tr>
            <th>Nome da Peça</th>
            <th>Fornecedor</th>
            <th>Tipo</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaDePecas.length === 0 && <tr><td colSpan="5" align="center">Nenhuma peça encontrada.</td></tr>}
          {listaDePecas.map((peca) => (
            <tr key={peca.id}>
              <td>{peca.nome}</td>
              <td>{peca.fornecedor}</td>
              <td>{peca.tipo}</td>
              <td>{peca.status}</td>
              <td>
                <button className={styles.actionButton} onClick={() => handleVisualizar(peca.id)}>
                  Visualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL DE CADASTRO */}
      {isModalOpen && (
        <Modal title="Cadastrar Nova Peça" onClose={() => setIsModalOpen(false)}>
          <form className={styles.modalForm} onSubmit={handleCadastrarSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="nome">Nome da Peça</label>
              <input type="text" id="nome" className={styles.formInput} placeholder="Ex: Motor Turbo-hélice" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="fornecedor">Fornecedor</label>
              <input type="text" id="fornecedor" className={styles.formInput} placeholder="Ex: Honeywell" value={novoFornecedor} onChange={(e) => setNovoFornecedor(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="tipo">Tipo</label>
              <select id="tipo" className={styles.formSelect} value={novoTipo} onChange={(e) => setNovoTipo(e.target.value)}>
                <option value="NACIONAL">Nacional</option>
                <option value="IMPORTADA">Importada</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="status">Status</label>
              <select id="status" className={styles.formSelect} value={novoStatus} onChange={(e) => setNovoStatus(e.target.value)}>
                <option value="EM_PRODUCAO">Em Produção</option>
                <option value="EM_TRANSPORTE">Em Transporte</option>
                <option value="PRONTA">Pronta para Uso</option>
              </select>
            </div>
            <button type="submit" className={styles.modalSubmitButton}>Salvar Peça</button>
          </form>
        </Modal>
      )}

      {/* --- NOVO: MODAL DE VISUALIZAÇÃO --- */}
      {isVisualizarModalOpen && pecaDetalhes && (
        <Modal title={`Detalhes: ${pecaDetalhes.nome}`} onClose={() => setIsVisualizarModalOpen(false)}>
          <div style={{ padding: '10px' }}>
            <p><strong>ID:</strong> {pecaDetalhes.id}</p>
            <p><strong>Fornecedor:</strong> {pecaDetalhes.fornecedor}</p>
            <p><strong>Tipo:</strong> {pecaDetalhes.tipo}</p>
            <p><strong>Status:</strong> {pecaDetalhes.status}</p>
            
            <hr style={{margin: '15px 0', borderTop: '1px solid #eee'}} />
            
            <h3>Vínculo</h3>
            {pecaDetalhes.aeronave ? (
              <p>
                Vinculada à aeronave: <strong>{pecaDetalhes.aeronave.codigo}</strong> ({pecaDetalhes.aeronave.modelo})
              </p>
            ) : (
              <p style={{color: '#666', fontStyle: 'italic'}}>Não vinculada a nenhuma aeronave.</p>
            )}

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button 
                className={styles.cadastrarButton} 
                style={{backgroundColor: '#6c757d'}} // Botão cinza para fechar
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

export default PecasLista;