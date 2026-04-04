# 🐾 Pet Shop - Sistema de Gerenciamento

Aplicação **fullstack** para gerenciamento de pet shop, permitindo o controle de clientes, pets e serviços, com dashboard de métricas e integração entre backend (Spring Boot) e frontend (Angular).

---

## 🚀 Tecnologias

### Backend

* Java 17+
* Spring Boot
* Spring Data JPA
* Spring Security
* H2 Database

### Frontend

* Angular
* TypeScript
* CSS3

---

## 📁 Estrutura do Projeto

```
conhecimento/
├── src/                    # Backend (Spring Boot)
├── frontend/              # Frontend (Angular)
│   └── src/app/
│       ├── components/    # Componentes (cliente, pet, servico, home)
│       ├── models/        # Interfaces TypeScript
│       └── services/      # Comunicação com API
├── pom.xml                # Dependências Java
└── package.json           # Dependências Angular
```

---

## ▶️ Como Executar

### Pré-requisitos

* Java 17+
* Node.js 18+
* Angular CLI

### 🔧 Backend

```bash
./mvnw spring-boot:run
```

API disponível em:
👉 http://localhost:8080

---

### 💻 Frontend

```bash
cd frontend
npm install
ng serve
```

Aplicação disponível em:
👉 http://localhost:4200

---

## 📱 Funcionalidades

### 👥 Clientes

* Listar clientes
* Cadastrar novo cliente
* Editar cliente
* Excluir cliente
* Validação de email único

### 🐶 Pets

* Listar pets
* Cadastrar pet vinculado a um cliente
* Visualizar pets por cliente

### ✂️ Serviços

* Listar serviços realizados
* Cadastrar serviços (banho, tosa, consulta, etc.)
* Vincular serviço a um pet

### 🏠 Dashboard

* Contagem de clientes, pets e serviços
* Visualização geral do sistema

---

## 🧠 Regras de Negócio

* Um cliente pode possuir vários pets
* Um pet pertence a apenas um cliente
* Um serviço está sempre vinculado a um pet
* O email do cliente deve ser único no sistema

---

## 🔗 Endpoints da API

| Método | Endpoint      | Descrição         |
| ------ | ------------- | ----------------- |
| GET    | /cliente      | Listar clientes   |
| POST   | /cliente      | Criar cliente     |
| PATCH  | /cliente/{id} | Atualizar cliente |
| DELETE | /cliente/{id} | Excluir cliente   |
| GET    | /pet          | Listar pets       |
| POST   | /pet          | Criar pet         |
| GET    | /servico      | Listar serviços   |
| POST   | /servico      | Criar serviço     |

---

## ⭐ Diferenciais

* Arquitetura em camadas (Controller, Service, Repository)
* Integração completa entre frontend e backend
* Validações de dados no backend
* Relacionamento entre entidades (Cliente ↔ Pet ↔ Serviço)
* Projeto fullstack com separação clara de responsabilidades

---

## 🔧 Melhorias Futuras

* Autenticação com JWT
* Paginação e filtros
* Testes automatizados (JUnit / MockMvc)
* Documentação com Swagger
* Deploy da aplicação

---

## 👨‍💻 Autor

Desenvolvido por Patrick Rebecchi
🔗 https://github.com/PatrickRebecchi

---
