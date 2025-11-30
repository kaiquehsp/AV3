// src/pages/Funcionarios/FuncionariosLista.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './FuncionariosLista.module.css';
import Modal from '../../components/Modal/Modal.jsx';

function FuncionariosLista() {
  const [listaDeFuncionarios, setListaDeFuncionarios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- NOVO: Estado para Visualização ---
  const [isVisualizarModalOpen, setIsVisualizarModalOpen] = useState(false);
  const [funcionarioDetalhes, setFuncionarioDetalhes] = useState(null);

  // Estados do formulário
  const [novoNome, setNovoNome] = useState('');
  const [novoTelefone, setNovoTelefone] = useState('');
  const [novoEndereco, setNovoEndereco] = useState('');
  const [novoUsuario, setNovoUsuario] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [novoNivel, setNovoNivel] = useState('OPERADOR');

  // --- BUSCAR (GET) ---
  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const carregarFuncionarios = async () => {
    try {
      const resposta = await axios.get('http://localhost:3000/funcionarios');
      setListaDeFuncionarios(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    }
  };

  // --- NOVO: HANDLE VISUALIZAR (Busca dados completos) ---
  const handleVisualizar = async (funcionarioId) => {
    try {
      const res = await axios.get(`http://localhost:3000/funcionarios/${funcionarioId}`);
      setFuncionarioDetalhes(res.data);
      setIsVisualizarModalOpen(true);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar detalhes do funcionário.");
    }
  };

  // --- SALVAR (POST) ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const novoFuncionario = {
        nome: novoNome,
        telefone: novoTelefone,
        endereco: novoEndereco,
        usuario: novoUsuario,
        senha: novaSenha, 
        nivelPermissao: novoNivel,
      };

      await axios.post('http://localhost:3000/funcionarios', novoFuncionario);
      
      alert("Funcionário cadastrado com sucesso!");
      carregarFuncionarios();

      setIsModalOpen(false);
      setNovoNome('');
      setNovoTelefone('');
      setNovoEndereco('');
      setNovoUsuario('');
      setNovaSenha('');
      setNovoNivel('OPERADOR');

    } catch (error) {
      console.error("Erro ao cadastrar funcionário:", error);
      alert("Erro ao cadastrar. Verifique se o usuário já existe.");
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h1>Lista de Funcionários</h1>
        <button className={styles.cadastrarButton} onClick={() => setIsModalOpen(true)}>
          Cadastrar Funcionário
        </button>
      </div>

      <table className={styles.tabelaFuncionarios}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Nível de Permissão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaDeFuncionarios.length === 0 && <tr><td colSpan="4" align="center">Nenhum funcionário cadastrado.</td></tr>}
          {listaDeFuncionarios.map((func) => (
            <tr key={func.id}>
              <td>{func.nome}</td>
              <td>{func.telefone}</td>
              <td>{func.nivelPermissao}</td>
              <td>
                <button className={styles.actionButton} onClick={() => handleVisualizar(func.id)}>
                  Visualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL DE CADASTRO */}
      {isModalOpen && (
        <Modal title="Cadastrar Novo Funcionário" onClose={() => setIsModalOpen(false)}>
          <form className={styles.modalForm} onSubmit={handleFormSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="nome">Nome Completo</label>
              <input type="text" id="nome" className={styles.formInput} value={novoNome} onChange={(e) => setNovoNome(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="telefone">Telefone</label>
              <input type="tel" id="telefone" className={styles.formInput} value={novoTelefone} onChange={(e) => setNovoTelefone(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="endereco">Endereço</label>
              <input type="text" id="endereco" className={styles.formInput} value={novoEndereco} onChange={(e) => setNovoEndereco(e.target.value)} required />
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '10px 0' }} />
            <div className={styles.formGroup}>
              <label htmlFor="usuario">Usuário (Login)</label>
              <input type="text" id="usuario" className={styles.formInput} value={novoUsuario} onChange={(e) => setNovoUsuario(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="senha">Senha</label>
              <input type="password" id="senha" className={styles.formInput} value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="nivel">Nível de Permissão</label>
              <select id="nivel" className={styles.formSelect} value={novoNivel} onChange={(e) => setNovoNivel(e.target.value)}>
                <option value="OPERADOR">Operador</option>
                <option value="ENGENHEIRO">Engenheiro</option>
                <option value="ADMINISTRADOR">Administrador</option>
              </select>
            </div>
            <button type="submit" className={styles.modalSubmitButton}>Salvar Funcionário</button>
          </form>
        </Modal>
      )}

      {/* --- NOVO: MODAL DE VISUALIZAÇÃO --- */}
      {isVisualizarModalOpen && funcionarioDetalhes && (
        <Modal title={`Funcionário: ${funcionarioDetalhes.nome}`} onClose={() => setIsVisualizarModalOpen(false)}>
          <div style={{ padding: '10px' }}>
            <p><strong>Login:</strong> {funcionarioDetalhes.usuario}</p>
            <p><strong>Nível:</strong> {funcionarioDetalhes.nivelPermissao}</p>
            <p><strong>Telefone:</strong> {funcionarioDetalhes.telefone}</p>
            <p><strong>Endereço:</strong> {funcionarioDetalhes.endereco}</p>
            
            <hr style={{margin: '15px 0', borderTop: '1px solid #eee'}} />
            
            <h3>Etapas Alocadas</h3>
            {funcionarioDetalhes.etapas && funcionarioDetalhes.etapas.length > 0 ? (
              <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                {funcionarioDetalhes.etapas.map(etapa => (
                  <li key={etapa.id} style={{marginBottom: '5px'}}>
                    {etapa.nome} - <span style={{fontSize: '0.9em', color: '#666'}}>({etapa.status})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{color: '#666', fontStyle: 'italic'}}>Nenhuma alocação no momento.</p>
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

export default FuncionariosLista;