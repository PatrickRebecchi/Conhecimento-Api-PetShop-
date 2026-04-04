# 🐾 Pet Shop - Sistema de Gerenciamento

Sistema completo para gerenciamento de Pet Shop com Backend (Java/Spring Boot) e Frontend (Angular).

---

## 🚀 Tecnologias

### Backend
- Java 17+
- Spring Boot
- Spring Data JPA
- Spring Security
- H2 Database (embutido)

### Frontend
- Angular 21
- TypeScript
- CSS3 Moderno

---

## 📁 Estrutura do Projeto

```
conhecimento/
├── src/                    # Backend Java/Spring
├── frontend/                # Frontend Angular
│   └── src/app/
│       ├── components/     # Componentes (cliente, pet, servico, home)
│       ├── models/         # Interfaces TypeScript
│       └── services/      # Serviços API
├── pom.xml                # Dependências Java
└── package.json         # Dependências Angular
```

---

## ▶️ Como Executar

### Pré-requisitos
- Java 17+
- Node.js 18+
- Angular CLI

### Backend

```bash
# Na pasta raiz do projeto
./mvnw spring-boot:run
```

A API estará disponível em: `http://localhost:8080`

### Frontend

```bash
cd frontend
npm install
ng serve
```

O frontend estará disponível em: `http://localhost:4200`

---

## 📱 Funcionalidades

### 👥 Clientes
- Listar todos os clientes
- Cadastrar novo cliente
- Editar cliente
- Excluir cliente
- Validação de email único

### 🐶 Pets
- Listar todos os pets
- Cadastrar novo pet (vinculado a um cliente)
- Visualizar宠物 relacionados ao dono

### ✂️ Serviços
- Listar serviços realizados
- Cadastrar novo serviço (banho, tosa, consulta, etc.)
- Visualizar pet atendido

### 🏠 Página Inicial
- Dashboard com统计ísticas
- Contagem de clientes, pets e serviços
- Ações rápidas para cadastro

---

## 🔗 Endpoints da API

| Método | Endpoint         | Descrição           |
| ------ | --------------- | ------------------|
| GET    | /cliente        | Listar clientes    |
| POST   | /cliente       | Criar cliente     |
| PATCH  | /cliente/{id}  | Atualizar cliente |
| DELETE | /cliente/{id}  | Excluir cliente  |
| GET    | /pet           | Listar pets      |
| POST   | /pet           | Criar pet         |
| GET    | /servico       | Listar serviços  |
| POST   | /servico       | Criar serviço    |

---

## 📄 Licença

MIT