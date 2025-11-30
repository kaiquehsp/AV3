// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout.jsx';
import Login from './pages/Login/Login.jsx';
import Registro from './pages/Registro/Registro.jsx'; 
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import AeronavesLista from './pages/Aeronaves/AeronavesLista.jsx';
import FuncionariosLista from './pages/Funcionarios/FuncionariosLista.jsx';
import EtapasLista from './pages/Etapas/EtapasLista.jsx';
import PecasLista from './pages/Pecas/PecasLista.jsx';
import TestesLista from './pages/Testes/TestesLista.jsx';
import Relatorios from './pages/Relatorios.jsx';


function App() {
  return (
    <Routes>
      {}
      <Route path="/login" element={<Login />} />
      
      {}
      <Route path="/" element={<Registro />} />

      {}
      <Route path="/dashboard" element={<Layout />}>
        {}
        <Route index element={<Dashboard />} /> 
        
        {}
        <Route path="aeronaves" element={<AeronavesLista />} />
        <Route path="funcionarios" element={<FuncionariosLista />} />
        <Route path="etapas" element={<EtapasLista />} />
        <Route path="pecas" element={<PecasLista />} />
        <Route path="testes" element={<TestesLista />} />
        <Route path="relatorios" element={<Relatorios />} />
      </Route>
      
      {}
      <Route path="*" element={
        <div style={{ padding: '50px', textAlign: 'center' }}>
          <h1>404 - Página Não Encontrada</h1>
          {}
          <a href="/dashboard">Voltar para o Dashboard</a>
        </div>
      } />
    </Routes>
  );
}

export default App;
