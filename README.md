# 🐾 API Pet Shop

API REST desenvolvida com **Java + Spring Boot** para gerenciamento de um Pet Shop, permitindo cadastro de clientes, pets, serviços e agendamentos.

---

## 🚀 Tecnologias utilizadas

* ☕ Java 17+
* 🌱 Spring Boot
* 🗄️ Spring Data JPA
* 🔐 Spring Validation
* 🐘 Banco de dados relacional (PostgreSQL ou H2)
* 📦 Maven

---

## 📌 Funcionalidades

### 👤 Cliente

* Criar cliente
* Listar clientes
* Buscar cliente por ID
* Validação de email único

### 🐶 Pet

* Cadastrar pet vinculado a um cliente
* Listar pets
* Relacionamento com cliente

### ✂️ Serviço

* Cadastro de serviços (banho, tosa, etc.)
* Controle de preço

### 📅 Agendamento

* Criar agendamentos
* Associar pet, funcionário e serviços
* Controle de status

---

## 🧠 Regras de negócio

* ❌ Não permite cadastro de clientes com email duplicado
* ✅ Validação de campos obrigatórios (nome, email, etc.)
* 🔁 Relacionamento entre cliente e pets
* 📌 Uso de enums para padronização de dados

---

## 🗂️ Estrutura do projeto

```
src/main/java/com/seuprojeto
│
├── controller
├── service
├── repository
├── entity
├── dto
│   ├── request
│   └── response
├── enums
├── exception
└── validation
```

---

## 🔄 Exemplo de requisição

### ➕ Criar cliente

**POST /clientes**

```json
{
  "nome": "Patrick",
  "telefone": "11999999999",
  "email": "patrick@email.com"
}
```

---

## 📥 Exemplo de resposta

```json
{
  "id": 1,
  "nome": "Patrick",
  "telefone": "11999999999",
  "email": "patrick@email.com",
  "quantidadePets": 0
}
```

---

## ⚠️ Tratamento de erros

A API possui tratamento global de exceções com respostas padronizadas:

```json
{
  "message": "Email já cadastrado",
  "httpStatus": "409 CONFLICT",
  "time": "2026-03-27T00:00:00"
}
```

---

## ▶️ Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo.git
```

---

### 2. Acessar a pasta

```bash
cd seu-repo
```

---

### 3. Rodar a aplicação

```bash
./mvnw spring-boot:run
```

ou

```bash
mvn spring-boot:run
```

---

## 🔗 Endpoints principais

| Método | Endpoint       | Descrição       |
| ------ | -------------- | --------------- |
| POST   | /clientes      | Criar cliente   |
| GET    | /clientes      | Listar clientes |
| GET    | /clientes/{id} | Buscar por ID   |

---

## 📈 Melhorias futuras

* 🔐 Autenticação com JWT
* 📄 Documentação com Swagger
* 📊 Paginação e filtros
* 🧪 Testes automatizados

---

## 👨‍💻 Autor

Desenvolvido por **Patrick**

🔗 GitHub: https://github.com/PatrickRebecchi

---

## 💬 Observações

Este projeto foi desenvolvido com foco em aprendizado, aplicando boas práticas de desenvolvimento backend como:

* Separação de camadas
* Uso de DTOs
* Tratamento de exceções
* Validações
* Organização de código

---
