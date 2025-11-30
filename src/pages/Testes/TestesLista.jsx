// src/pages/Testes/TestesLista.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './TestesLista.module.css';
import Modal from '../../components/Modal/Modal.jsx';

function TestesLista() {
  const [listaDeTestes, setListaDeTestes] = useState([]);
  const [listaDeAeronaves, setListaDeAeronaves] = useState([]); // Para o select
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- NOVO: Estado para Visualização ---
  const [isVisualizarModalOpen, setIsVisualizarModalOpen] = useState(false);
  const [testeDetalhes, setTesteDetalhes] = useState(null);

  // Estados do formulário
  const [novoTipo, setNovoTipo] = useState('ELETRICO');
  const [novoResultado, setNovoResultado] = useState('APROVADO');
  const [novaData, setNovaData] = useState('');
  const [novaAeronaveId, setNovaAeronaveId] = useState('');

  // --- CARREGAR DADOS ---
  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [resTestes, resAeronaves] = await Promise.all([
        axios.get('http://localhost:3000/testes'),
        axios.get('http://localhost:3000/aeronaves')
      ]);
      setListaDeTestes(resTestes.data);
      setListaDeAeronaves(resAeronaves.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  // --- NOVO: HANDLE VISUALIZAR ---
  const handleVisualizar = async (testeId) => {
    try {
      const res = await axios.get(`http://localhost:3000/testes/${testeId}`);
      setTesteDetalhes(res.data);
      setIsVisualizarModalOpen(true);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar detalhes do teste.");
    }
  };

  // --- SALVAR DADOS (POST) ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!novaAeronaveId) {
      alert("Selecione uma aeronave.");
      return;
    }

    try {
      const novoTeste = {
        tipo: novoTipo,
        resultado: novoResultado,
        data: novaData, // Data em string YYYY-MM-DD
        aeronaveId: novaAeronaveId,
      };

      await axios.post('http://localhost:3000/testes', novoTeste);
      
      alert("Teste registrado com sucesso!");
      carregarDados();
      
      // Limpa form
      setIsModalOpen(false);
      setNovoTipo('ELETRICO');
      setNovoResultado('APROVADO');
      setNovaData('');
      setNovaAeronaveId('');

    } catch (error) {
      console.error("Erro ao cadastrar teste:", error);
      alert("Erro ao cadastrar teste. Verifique os dados.");
    }
  };
  
  return (
    <div>
      <div className={styles.header}>
        <h1>Lista de Testes</h1>
        <button className={styles.cadastrarButton} onClick={() => setIsModalOpen(true)}>
          Cadastrar Teste
        </button>
      </div>

      <table className={styles.tabelaTestes}>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Resultado</th>
            <th>Data</th>
            <th>Aeronave ID</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaDeTestes.length === 0 && <tr><td colSpan="5" align="center">Nenhum teste registrado.</td></tr>}
          {listaDeTestes.map((teste) => (
            <tr key={teste.id}>
              <td>{teste.tipo}</td>
              <td>{teste.resultado}</td>
              <td>{new Date(teste.data).toLocaleDateString()}</td>
              <td>
  {/* Se tiver aeronave, mostra o código (ex: AC-001), senão mostra o ID ou N/A */}
  {teste.aeronave ? teste.aeronave.codigo : teste.aeronaveId}
</td>
              <td>
                <button className={styles.actionButton} onClick={() => handleVisualizar(teste.id)}>
                  Visualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL DE CADASTRO */}
      {isModalOpen && (
        <Modal title="Cadastrar Novo Teste" onClose={() => setIsModalOpen(false)}>
          <form className={styles.modalForm} onSubmit={handleFormSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="tipo">Tipo de Teste</label>
              <select id="tipo" className={styles.formSelect} value={novoTipo} onChange={(e) => setNovoTipo(e.target.value)}>
                <option value="ELETRICO">Elétrico</option>
                <option value="HIDRAULICO">Hidráulico</option>
                <option value="AERODINAMICO">Aerodinâmico</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="resultado">Resultado</label>
              <select id="resultado" className={styles.formSelect} value={novoResultado} onChange={(e) => setNovoResultado(e.target.value)}>
                <option value="APROVADO">Aprovado</option>
                <option value="REPROVADO">Reprovado</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="data">Data de Execução</label>
              <input type="date" id="data" className={styles.formInput} value={novaData} onChange={(e) => setNovaData(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="aeronaveId">Aeronave Testada</label>
              <select id="aeronaveId" className={styles.formSelect} value={novaAeronaveId} onChange={(e) => setNovaAeronaveId(e.target.value)} required>
                <option value="" disabled>Selecione a aeronave...</option>
                {listaDeAeronaves.map(a => (
                  <option key={a.id} value={a.id}>{a.codigo} ({a.modelo})</option>
                ))}
              </select>
            </div>
            <button type="submit" className={styles.modalSubmitButton}>Salvar Teste</button>
          </form>
        </Modal>
      )}

      {/* --- NOVO: MODAL DE VISUALIZAÇÃO --- */}
      {isVisualizarModalOpen && testeDetalhes && (
        <Modal title={`Detalhes do Teste`} onClose={() => setIsVisualizarModalOpen(false)}>
          <div style={{ padding: '10px' }}>
            <p><strong>Tipo:</strong> {testeDetalhes.tipo}</p>
            <p><strong>Resultado:</strong> <span style={{fontWeight: 'bold', color: testeDetalhes.resultado === 'APROVADO' ? 'green' : 'red'}}>{testeDetalhes.resultado}</span></p>
            <p><strong>Data:</strong> {new Date(testeDetalhes.data).toLocaleDateString()}</p>
            
            <hr style={{margin: '15px 0', borderTop: '1px solid #eee'}} />
            
            <h3>Aeronave Testada</h3>
            {testeDetalhes.aeronave ? (
              <p>
                <strong>{testeDetalhes.aeronave.codigo}</strong> - {testeDetalhes.aeronave.modelo}
              </p>
            ) : (
              <p style={{color: '#666', fontStyle: 'italic'}}>Aeronave não encontrada (possivelmente excluída).</p>
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

export default TestesLista;