// src/pages/Aeronaves/AeronavesLista.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AeronavesLista.module.css';
import Modal from '../../components/Modal/Modal.jsx';

function AeronavesLista() {
  const [listaDeAeronaves, setListaDeAeronaves] = useState([]);
  
  
  const [listaDePecasDisponiveis, setListaDePecasDisponiveis] = useState([]); 

  const [isRegistrarModalOpen, setIsRegistrarModalOpen] = useState(false);
  const [isVincularModalOpen, setIsVincularModalOpen] = useState(false);
  
  
  const [isVisualizarModalOpen, setIsVisualizarModalOpen] = useState(false);
  const [aeronaveDetalhes, setAeronaveDetalhes] = useState(null);

  
  const [novoCodigo, setNovoCodigo] = useState('');
  const [novoModelo, setNovoModelo] = useState('');
  const [novoTipo, setNovoTipo] = useState('COMERCIAL');
  const [novaCapacidade, setNovaCapacidade] = useState(0);
  const [novoAlcance, setNovoAlcance] = useState(0);

  
  const [aeronaveSelecionadaId, setAeronaveSelecionadaId] = useState('');
  const [pecaSelecionadaId, setPecaSelecionadaId] = useState('');

  
  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [resAeronaves, resPecas] = await Promise.all([
        axios.get('http://localhost:3000/aeronaves'),
        axios.get('http://localhost:3000/pecas')
      ]);

      setListaDeAeronaves(resAeronaves.data);

      
      const pecasLivres = resPecas.data.filter(p => !p.aeronaveId);
      setListaDePecasDisponiveis(pecasLivres);

    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  
  const handleRegistrarSubmit = async (e) => {
    e.preventDefault();
    try {
      const novaAeronave = {
        codigo: novoCodigo,
        modelo: novoModelo,
        tipo: novoTipo,
        capacidade: Number(novaCapacidade),
        alcance: Number(novoAlcance)
      };
      await axios.post('http://localhost:3000/aeronaves', novaAeronave);
      alert("Aeronave cadastrada com sucesso!");
      carregarDados(); 
      setIsRegistrarModalOpen(false);
      setNovoCodigo(''); setNovoModelo(''); setNovoCapacidade(0); setNovoAlcance(0);
    } catch (error) {
      alert("Erro ao cadastrar. Verifique o código.");
    }
  };

  
  const handleVincularSubmit = async (e) => {
    e.preventDefault();
    if (!aeronaveSelecionadaId || !pecaSelecionadaId) {
      alert("Selecione uma aeronave e uma peça.");
      return;
    }
    try {
      await axios.put(`http://localhost:3000/pecas/${pecaSelecionadaId}`, {
        aeronaveId: aeronaveSelecionadaId
      });
      alert("Peça vinculada com sucesso!");
      carregarDados();
      setIsVincularModalOpen(false);
      setAeronaveSelecionadaId('');
      setPecaSelecionadaId('');
    } catch (error) {
      console.error(error);
      alert("Erro ao vincular peça.");
    }
  };

  
  const handleVisualizar = async (aeronaveId) => {
    try {
      const resposta = await axios.get(`http://localhost:3000/aeronaves/${aeronaveId}`);
      setAeronaveDetalhes(resposta.data);
      setIsVisualizarModalOpen(true);
    } catch (error) {
      console.error("Erro ao carregar detalhes:", error);
      alert("Erro ao carregar detalhes da aeronave.");
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h1>Lista de Aeronaves</h1>
        <div className={styles.headerActions}>
          <button className={styles.secondaryButton} onClick={() => setIsVincularModalOpen(true)}>
            Vincular Peça
          </button>
          <button className={styles.primaryButton} onClick={() => setIsRegistrarModalOpen(true)}>
            Registrar Aeronave
          </button>
        </div>
      </div>

      <table className={styles.tabelaAeronaves}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Modelo</th>
            <th>Tipo</th>
            <th>Capacidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaDeAeronaves.length === 0 && <tr><td colSpan="5" align="center">Nenhuma aeronave cadastrada.</td></tr>}
          {listaDeAeronaves.map((aeronave) => (
            <tr key={aeronave.id}>
              <td>{aeronave.codigo}</td>
              <td>{aeronave.modelo}</td>
              <td>{aeronave.tipo}</td>
              <td>{aeronave.capacidade}</td>
              <td>
                <button className={styles.actionButton} onClick={() => handleVisualizar(aeronave.id)}>
                  Visualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {}
      {isRegistrarModalOpen && (
        <Modal title="Registrar Nova Aeronave" onClose={() => setIsRegistrarModalOpen(false)}>
          <form className={styles.modalForm} onSubmit={handleRegistrarSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="codigo">Código (Único)</label>
              <input type="text" id="codigo" className={styles.formInput} value={novoCodigo} onChange={(e) => setNovoCodigo(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="modelo">Modelo</label>
              <input type="text" id="modelo" className={styles.formInput} value={novoModelo} onChange={(e) => setNovoModelo(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="tipo">Tipo</label>
              <select id="tipo" className={styles.formSelect} value={novoTipo} onChange={(e) => setNovoTipo(e.target.value)}>
                <option value="COMERCIAL">Comercial</option> 
                <option value="MILITAR">Militar</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="capacidade">Capacidade</label>
              <input type="number" id="capacidade" className={styles.formInput} value={novaCapacidade} onChange={(e) => setNovaCapacidade(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="alcance">Alcance (km)</label>
              <input type="number" id="alcance" className={styles.formInput} value={novoAlcance} onChange={(e) => setNovoAlcance(e.target.value)} required />
            </div>
            <button type="submit" className={styles.modalSubmitButton}>Salvar Aeronave</button>
          </form>
        </Modal>
      )}

      {}
      {isVincularModalOpen && (
        <Modal title="Vincular Peça" onClose={() => setIsVincularModalOpen(false)}>
           <form className={styles.modalForm} onSubmit={handleVincularSubmit}>
             <div className={styles.formGroup}>
               <label>Selecione a Aeronave</label>
               <select 
                  className={styles.formSelect} 
                  value={aeronaveSelecionadaId} 
                  onChange={(e) => setAeronaveSelecionadaId(e.target.value)}
                  required
               >
                 <option value="" disabled>Escolha uma aeronave...</option>
                 {listaDeAeronaves.map(a => (
                   <option key={a.id} value={a.id}>{a.codigo} - {a.modelo}</option>
                 ))}
               </select>
             </div>
             <div className={styles.formGroup}>
               <label>Selecione a Peça (Disponível)</label>
               <select 
                  className={styles.formSelect} 
                  value={pecaSelecionadaId} 
                  onChange={(e) => setPecaSelecionadaId(e.target.value)}
                  required
               >
                 <option value="" disabled>Escolha uma peça...</option>
                 {listaDePecasDisponiveis.length === 0 && <option disabled>Sem peças livres no estoque.</option>}
                 {listaDePecasDisponiveis.map(p => (
                   <option key={p.id} value={p.id}>{p.nome} ({p.status})</option>
                 ))}
               </select>
             </div>
             <button type="submit" className={styles.modalSubmitButton}>Confirmar Vínculo</button>
           </form>
        </Modal>
      )}

      {}
      {isVisualizarModalOpen && aeronaveDetalhes && (
        <Modal title={`Detalhes: ${aeronaveDetalhes.codigo}`} onClose={() => setIsVisualizarModalOpen(false)}>
          <div style={{ padding: '10px' }}>
            <p><strong>Modelo:</strong> {aeronaveDetalhes.modelo}</p>
            <p><strong>Tipo:</strong> {aeronaveDetalhes.tipo}</p>
            <p><strong>Capacidade:</strong> {aeronaveDetalhes.capacidade} pax</p>
            <p><strong>Alcance:</strong> {aeronaveDetalhes.alcance} km</p>
            
            <hr style={{margin: '15px 0', borderTop: '1px solid #eee'}} />
            
            <h3>Peças Vinculadas</h3>
            {aeronaveDetalhes.pecas && aeronaveDetalhes.pecas.length > 0 ? (
              <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                {aeronaveDetalhes.pecas.map(peca => (
                  <li key={peca.id} style={{marginBottom: '5px'}}>
                    <strong>{peca.nome}</strong> <span style={{fontSize: '0.9em', color: '#666'}}>({peca.status})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#666', fontStyle: 'italic' }}>Nenhuma peça vinculada.</p>
            )}

            <hr style={{margin: '15px 0', borderTop: '1px solid #eee'}} />

            <h3>Etapas de Produção</h3>
            {aeronaveDetalhes.etapas && aeronaveDetalhes.etapas.length > 0 ? (
              <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                {aeronaveDetalhes.etapas.map(etapa => (
                  <li key={etapa.id} style={{marginBottom: '5px'}}>
                    {etapa.nome} - <strong>{etapa.status}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#666', fontStyle: 'italic' }}>Nenhuma etapa registrada.</p>
            )}

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button 
                className={styles.secondaryButton} 
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

export default AeronavesLista;