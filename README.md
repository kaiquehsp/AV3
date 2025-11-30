# ✈️ Aerocode — Sistema de Gestão da Produção 

## Aplicação Web Completa com React, Node.js e MySQL

Bem-vindo ao repositório oficial do **Aerocode Web**, desenvolvido como requisito final da avaliação **AV3**.

Este projeto consiste na evolução do sistema para uma **Aplicação Web Full Stack** robusta, focada no gerenciamento crítico da produção de aeronaves. O sistema utiliza uma arquitetura moderna com **React** no Front-end e **Node.js** no Back-end, garantindo persistência de dados em banco **MySQL**.

---

## 🔍 Visão Geral

A aplicação foi projetada para atender aos requisitos de qualidade e performance de grandes clientes do setor aeroespacial. Ela substitui protótipos anteriores por um sistema real, conectado a um banco de dados, capaz de gerenciar todo o ciclo de vida de produção, desde o cadastro de funcionários até a entrega final da aeronave.

O projeto inclui tanto o **Front-end** (interface do usuário) quanto o **Back-end** (API e Banco de Dados), além de scripts de teste de carga para validação de performance.

---

## 🧩 Funcionalidades Implementadas

O sistema implementa todas as regras de negócio e fluxos operacionais, organizados da seguinte forma:

* **Fluxo de Autenticação:**
    * Tela de **Login** para acesso seguro ao sistema.
    * Tela de **Registro** (rota oculta `/registro`) para a criação do primeiro Administrador.

* **Dashboard Principal:**
    * Painel central com acesso rápido a todos os módulos do sistema.
    * Navegação persistente e responsiva.

* **Gestão Completa (CRUD com Banco de Dados):**
    * **Aeronaves:** Cadastro, listagem, visualização detalhada e vínculo com peças.
    * **Peças:** Gestão de inventário e status de peças (Nacional/Importada).
    * **Funcionários:** Cadastro de equipe (Engenheiros, Operadores) e controle de permissões.
    * **Etapas:** Definição do fluxo de produção e alocação de funcionários responsáveis.
    * **Testes:** Registro de resultados de testes (Elétrico, Hidráulico, Aerodinâmico).

* **Relatórios e Qualidade:**
    * **Gerador de Relatórios:** Exportação automática de um arquivo `.txt` contendo o histórico completo da aeronave.
    * **Testes de Carga:** Scripts automatizados para medir latência e tempo de resposta sob carga (1, 5 e 10 usuários).

---

## 🛠️ Tecnologias

* **Front-end:**
    * **React** (Vite) — Interface de usuário rápida e moderna.
    * **Axios** — Comunicação HTTP com o servidor.
    * **CSS Modules** — Estilização organizada e escopada.

* **Back-end:**
    * **Node.js** & **TypeScript** — Servidor robusto e tipado.
    * **Express** — Framework para criação da API REST.
    * **Prisma ORM** — Gerenciamento eficiente do banco de dados.
    * **MySQL** — Banco de dados relacional para persistência segura.

---

## ✅ Pré-requisitos

Para executar o projeto, certifique-se de ter instalado:
* **Node.js** (Versão 18 ou superior).
* **MySQL** (Serviço rodando, ex: via XAMPP ou Workbench).
* **Git**.

---

## 🚀 Guia de Inicialização

Siga a ordem abaixo para configurar o ambiente completo (Back-end e Front-end).

### Passo 1: Configurar o Back-end

```bash
# 1. Clone o repositório
git clone https://github.com/kaiquehsp/AV3.git

# 2. Entre na pasta do servidor
cd AV3/aerocode-backend

# 3. Instale as dependências
npm install

# 4. Configure o Banco de Dados
# Crie um arquivo .env na pasta 'aerocode-backend' e adicione sua conexão MySQL:
# DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/aerocode"

# 5. Prepare o MySQL (Importante!)
# Abra seu gerenciador de banco de dados (Workbench/DBeaver) e crie um banco vazio:
# CREATE DATABASE aerocode;

# 6. Crie as tabelas no banco
npx prisma migrate dev --name init

# 7. Inicie o servidor
npm run dev

### Passo 2: Configurar o Front-end

# 1.  Abrir outro CMD e instalar as dependencias da raiz
npm install

# 2. Iniciar o Front-End
npm run dev

# 3. Acessar o servidor


