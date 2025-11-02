# ✈️ Aerocode — Sistema de Gestão da Produção (GUI)

## Protótipo de Interface Gráfica (SPA) em React

Bem-vindo ao repositório da nova interface gráfica (GUI) da Aerocode. Este projeto é um protótipo navegável de alta fidelidade, construído no formato **SPA (Single Page Application)**, utilizando **React** e **Vite**.

---

## 🔍 Visão Geral

Esta aplicação é a evolução do sistema CLI original (desenvolvido na AV1). O objetivo principal foi substituir a interface de linha de comando por uma plataforma visual moderna, intuitiva e de alta performance, visando reduzir a curva de aprendizado dos engenheiros e preparar o produto para ser apresentado a grandes clientes do setor aeroespacial.

O protótipo é focado inteiramente no **front-end**, utilizando dados "mock" (falsos) para simular a interação, sem depender de um back-end.

---

## 🧩 Funcionalidades Implementadas

A interface implementa visualmente todas as regras de negócio definidas na AV1, organizadas da seguinte forma:

* **Fluxo de Autenticação:**
    * Tela de **Login** para usuários existentes.
    * Tela de **Registro** (rota `/registro`) para simular a criação do primeiro Administrador do sistema.

* **Dashboard Principal:**
    * Página inicial (com imagem "Hero") após o login, com navegação central para todos os módulos.
    * Menu de navegação persistente (Layout) que destaca a página ativa.

* **Gestão de Módulos (CRUD):**
    * **Testes:** Listagem e modal para "Cadastrar Teste".
    * **Relatórios:** Página dedicada para a ação de "Gerar Relatório".
    * **Aeronaves:** Listagem e modais para "Registrar Aeronave" e "Vincular Peça".
    * **Funcionários:** Listagem e modal para "Cadastrar Funcionário" (função do Admin).
    * **Etapas:** Listagem e modais para "Cadastrar Etapa" e "Alocar Funcionário".
    * **Peças:** Listagem e modal para "Cadastrar Peça".

---

## 🛠️ Tecnologias

* **React** — Biblioteca principal para a construção da interface de usuário.
* **Vite** — Ferramenta de build e servidor de desenvolvimento de alta performance.
* **React Router DOM** — Para a navegação e gerenciamento das rotas da SPA.
* **CSS Modules** — Para estilização escopada e organizada de cada componente.

---

## ✅ Pré-requisitos

* Node.js (versão 18.x ou superior)
* NPM (ou Yarn)

## 🚀 Guia de inicialização:

```bash
# 1. Clone o repositório
git clone https://github.com/kaiquehsp/AV2.git

# 2. Entre no diretório do projeto
cd aerocode-gui

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
